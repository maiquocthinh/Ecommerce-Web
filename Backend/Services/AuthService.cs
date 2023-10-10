using System.Collections.Immutable;
using System.Security.Claims;
using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Jwt;
using Backend.Models;
using Backend.Respositories.Interfaces;
using Backend.Services.Interfaces;

namespace Backend.Services;

public class AuthService : IAuthService
{
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly JwtUtil _jwtUtil;
    private readonly string _employeeAccessTokenExpired;
    private readonly string _customerAccessTokenExpired;

    public AuthService(IConfiguration configuration, JwtUtil jwtUtil, IRefreshTokenRepository refreshTokenRepository,
        ICustomerRepository customerRepository)
    {
        _jwtUtil = jwtUtil;
        _employeeAccessTokenExpired = configuration["Jwt:EmployeeAccessTokenExpired"] ?? string.Empty;
        _customerAccessTokenExpired = configuration["Jwt:CustomerAccessTokenExpired"] ?? string.Empty;
        _refreshTokenRepository = refreshTokenRepository;
        _customerRepository = customerRepository;
    }

    public async Task<AccessTokenDto> RefreshAccessToken(RefreshAccessTokenDto refreshAccessTokenDto)
    {
        // jwt decode
        var claims = _jwtUtil.ValidateToken(refreshAccessTokenDto.RefreshToken);
        // find and compare with refresh token in db
        string? refreshTokenId = claims?.Find(c => c.Type == AppClaimTypes.RefreshTokenId)?.Value;
        if (refreshTokenId is null) throw new UnauthorizedException("Refresh Token Invalid");
        var refreshToken = await _refreshTokenRepository.GetById(new Guid(refreshTokenId));
        if (refreshToken?.Token != refreshAccessTokenDto.RefreshToken && refreshToken?.ExpiresAt > DateTime.Now)
            throw new UnauthorizedException("Refresh Token Invalid");

        // get info need to create new token
        var employee = refreshToken?.Employee;
        if (employee is null) throw new ForbiddenException("Cannot Refresh Access Token");

        // generate access token
        var accessToken = _jwtUtil.GenerateToken(new Claim[]
                {
                    new Claim(ClaimTypes.Email, employee.Email),
                    new Claim(ClaimTypes.GivenName, employee.FirstName),
                    new Claim(ClaimTypes.Surname, employee.LastName),
                }.Concat(
                    employee?.Role?.PermissionList?.Select(permission
                        => new Claim(AppClaimTypes.Permissions, permission)) ?? Array.Empty<Claim>())
                .ToImmutableArray(),
            _employeeAccessTokenExpired
        );

        return new AccessTokenDto() { AccessToken = accessToken };
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
        var accessToken = _jwtUtil.GenerateToken(new Claim[]
        {
            new Claim(ClaimTypes.Email, customer.Email),
            new Claim(ClaimTypes.GivenName, customer.FirstName),
            new Claim(ClaimTypes.Surname, customer.LastName),
        }, _customerAccessTokenExpired);
        return new AccessTokenDto() { AccessToken = accessToken };
    }
}