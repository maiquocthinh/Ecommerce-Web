using System.Collections.Immutable;
using System.Security.Claims;
using Backend.Authorization;
using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Email.Models;
using Backend.Infrastructure.Email.Templates;
using Backend.Infrastructure.Jwt;
using Backend.Infrastructure.RabbitMQ;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using Newtonsoft.Json;

namespace Backend.Services;

public class AuthService : IAuthService
{
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly IEmployeeRepository _employeeRepository;
    private readonly JwtUtil _jwtUtil;
    private readonly IRabbitMQService _rabbitMqService;
    private readonly string _frontendBaseUrl;
    private readonly string _employeeAccessTokenExpired;
    private readonly string _employeeRefreshTokenExpired;
    private readonly string _customerAccessTokenExpired;
    private readonly string _customerResetPasswordTokenExpired;

    public AuthService(IConfiguration configuration, JwtUtil jwtUtil, IRabbitMQService rabbitMqService,
        IRefreshTokenRepository refreshTokenRepository,
        ICustomerRepository customerRepository, IEmployeeRepository employeeRepository)
    {
        _jwtUtil = jwtUtil;
        _rabbitMqService = rabbitMqService;
        _frontendBaseUrl = configuration.GetValue<string>("Frontend:BaseUrl") ?? string.Empty;
        _employeeAccessTokenExpired = configuration.GetValue<string>("Jwt:EmployeeAccessTokenExpired") ?? string.Empty;
        _employeeRefreshTokenExpired =
            configuration.GetValue<string>("Jwt:EmployeeRefreshTokenExpired") ?? string.Empty;
        _customerAccessTokenExpired = configuration.GetValue<string>("Jwt:CustomerAccessTokenExpired") ?? string.Empty;
        _customerResetPasswordTokenExpired =
            configuration.GetValue<string>("Jwt:CustomerResetPasswordTokenExpired") ?? string.Empty;
        _refreshTokenRepository = refreshTokenRepository;
        _customerRepository = customerRepository;
        _employeeRepository = employeeRepository;
    }

    public async Task<RefreshTokenAndAccessTokenDto> EmployeeLogin(EmployeeLoginDto employeeLoginDto)
    {
        // check employee
        var employee = await _employeeRepository.GetByEmail(employeeLoginDto.Email);
        if (employee is null) throw new UnauthorizedException("Email or Password wrong!");
        if (!BCrypt.Net.BCrypt.Verify(employeeLoginDto.Password, employee.HashedPassword))
            throw new UnauthorizedException("Email or Password wrong!");

        // generate refresh token
        var rtExpired = DateTime.Now.Add(JwtUtil.ParseTimeSpan(_employeeRefreshTokenExpired));
        var rt = await _refreshTokenRepository.Add(new RefreshToken { EmployeeId = employee.Id, ExpiresAt = rtExpired });
        var refreshToken = _jwtUtil.GenerateToken(new Claim[] { new Claim(AppClaimTypes.RefreshTokenId, rt.Id.ToString() ?? string.Empty) }, rtExpired);

        rt.Token = refreshToken;
        await _refreshTokenRepository.Update(rt);

        // generate access token
        var atExpired = DateTime.Now.Add(JwtUtil.ParseTimeSpan(_employeeAccessTokenExpired));
        var accessToken = _jwtUtil.GenerateToken(new Claim[]
            {
                new Claim(ClaimTypes.Email, employee.Email),
                new Claim(ClaimTypes.GivenName, employee.FirstName),
                new Claim(ClaimTypes.Surname, employee.LastName),
                new Claim(AppClaimTypes.AvatarUrl, employee.AvatarUrl),
            }.Concat(
                employee?.Role?.PermissionList?.Select(permission
                    => new Claim(AppClaimTypes.Permissions, permission)) ?? Array.Empty<Claim>())
            .ToImmutableArray(), atExpired);

        return new RefreshTokenAndAccessTokenDto
        {
            AccessToken = accessToken,
            AccessTokenExpiredIn = atExpired,
            RefreshToken = refreshToken,
            RefreshTokenExpiredIn = rtExpired
        };
    }

    public async Task EmployeeLogout(RefreshTokenInputDto refreshTokenInputDto)
    {
        // jwt decode
        var claims = _jwtUtil.ValidateToken(refreshTokenInputDto.RefreshToken);
        // find and compare with refresh token in db
        string? refreshTokenId = claims?.Find(c => c.Type == AppClaimTypes.RefreshTokenId)?.Value;
        if (refreshTokenId is null) throw new UnauthorizedException("Refresh Token Invalid");

        // delete refresh token in db
        var removeSuccess = await _refreshTokenRepository.Remove(new Guid(refreshTokenId));
        if (!removeSuccess) throw new BadRequestException("Logout fail.");
    }

    public async Task<AccessTokenDto> EmployeeRefreshAccessToken(RefreshTokenInputDto refreshTokenInputDto)
    {
        // jwt decode
        var claims = _jwtUtil.ValidateToken(refreshTokenInputDto.RefreshToken);
        // find and compare with refresh token in db
        string? refreshTokenId = claims?.Find(c => c.Type == AppClaimTypes.RefreshTokenId)?.Value;
        if (refreshTokenId is null) throw new UnauthorizedException("Refresh Token Invalid");
        var refreshToken = await _refreshTokenRepository.GetById(new Guid(refreshTokenId));
        if (refreshToken?.Token != refreshTokenInputDto.RefreshToken && refreshToken?.ExpiresAt > DateTime.Now)
            throw new UnauthorizedException("Refresh Token Invalid");

        // get info need to create new token
        var employee = refreshToken?.Employee;
        if (employee is null) throw new ForbiddenException("Cannot Refresh Access Token");

        // generate access token
        var atExpired = DateTime.Now.Add(JwtUtil.ParseTimeSpan(_employeeAccessTokenExpired));
        var accessToken = _jwtUtil.GenerateToken(new Claim[]
                {
                    new Claim(ClaimTypes.Email, employee.Email),
                    new Claim(ClaimTypes.GivenName, employee.FirstName),
                    new Claim(ClaimTypes.Surname, employee.LastName),
                    new Claim(AppClaimTypes.AvatarUrl, employee.AvatarUrl),
                }.Concat(
                    employee?.Role?.PermissionList?.Select(permission
                        => new Claim(AppClaimTypes.Permissions, permission)) ?? Array.Empty<Claim>())
                .ToImmutableArray(),
            atExpired
        );

        return new AccessTokenDto() { AccessToken = accessToken, AccessTokenExpiredIn = atExpired};
    }

    public async Task<Customer> RegisterNewCustomer(CustomerRegisterDto customerRegisterDto)
    {
        // check email or  phone number already used?
        var customerExits =
            await _customerRepository.GetByEmailOrPhoneNumber(customerRegisterDto.Email,
                customerRegisterDto.PhoneNumber);
        if (customerExits != null)
        {
            if (customerExits.Email == customerRegisterDto.Email)
                throw new ConflictException("This email already used, please use another email.");
            if (customerExits.PhoneNumber == customerRegisterDto.PhoneNumber)
                throw new ConflictException("This phone number already used, please use another phone number.");
        }

        // create new customer
        return await _customerRepository.Add(new()
        {
            FirstName = customerRegisterDto.FirstName,
            LastName = customerRegisterDto.LastName,
            Email = customerRegisterDto.Email,
            PhoneNumber = customerRegisterDto.PhoneNumber,
            HashedPassword = BCrypt.Net.BCrypt.HashPassword(customerRegisterDto.Password),
        });
    }

    public async Task<AccessTokenDto> CustomerLogin(CustomerLoginDto customerLoginDto)
    {
        // check customer
        var customer = await _customerRepository.GetByEmail(customerLoginDto.Email);
        if (customer is null) throw new UnauthorizedException("Email or Password wrong!");
        if (!BCrypt.Net.BCrypt.Verify(customerLoginDto.Password, customer.HashedPassword))
            throw new UnauthorizedException("Email or Password wrong!");
        // generate access token
        var atExpired = DateTime.Now.Add(JwtUtil.ParseTimeSpan(_customerAccessTokenExpired));
        var accessToken = _jwtUtil.GenerateToken(new Claim[]
        {
            new Claim(ClaimTypes.Email, customer.Email),
            new Claim(ClaimTypes.GivenName, customer.FirstName),
            new Claim(ClaimTypes.Surname, customer.LastName),
        }, atExpired);
        return new AccessTokenDto() { AccessToken = accessToken, AccessTokenExpiredIn = atExpired};
    }

    public async Task CustomerChangePassword(string? email, CustomerChangePasswordDto customerChangePasswordDto)
    {
        // validate email & customer
        if (email is null) throw new UnauthorizedException("Please login to do this action.");
        var customer = await _customerRepository.GetByEmail(email);
        if (customer is null) throw new UnauthorizedException("Please login to do this action.");

        // compare old password
        if (!BCrypt.Net.BCrypt.Verify(customerChangePasswordDto.OldPassword, customer.HashedPassword))
            throw new BadRequestException("Old password not match.");

        // update new password
        customer.HashedPassword = BCrypt.Net.BCrypt.HashPassword(customerChangePasswordDto.NewPassword);
        await _customerRepository.Update(customer);
    }

    public async Task CustomerSendEmailReset(string email)
    {
        // validate email & customer
        var customer = await _customerRepository.GetByEmail(email);
        if (customer is null) throw new UnauthorizedException("Account is not exits.");

        // generate reset password token
        string token = _jwtUtil.GenerateToken(new Claim[]
        {
            new Claim(ClaimTypes.Email, customer.Email!),
            new Claim(AppClaimTypes.Permissions, Permissions.ResetPassword)
        }, _customerResetPasswordTokenExpired);

        // publish email message to queue
        string emailMessageJson = JsonConvert.SerializeObject(new EmailMessage
        {
            To = customer.Email!,
            Subject = "Reset Password",
            Model = new ResetPasswordModel
            {
                SiteUrl = _frontendBaseUrl,
                Firstname = customer.FirstName,
                Token = token
            },
            TemplateName = EmailTemplates.ResetPassword
        });
        _rabbitMqService.PublishMessage(queueName: QueueNames.EmailQueue, message: emailMessageJson);
    }

    public async Task CustomerResetPassword(string? email, CustomerResetPasswordDto customerResetPasswordDto)
    {
        // validate email & customer
        if (email is null) throw new InternalServerException("A error occurred while processing your request");
        var customer = await _customerRepository.GetByEmail(email);
        if (customer is null) throw new InternalServerException("A error occurred while processing your request");

        // update new password
        customer.HashedPassword = BCrypt.Net.BCrypt.HashPassword(customerResetPasswordDto.Password);
        await _customerRepository.Update(customer);
    }
}