using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IAuthService
{
    Task<RefreshTokenAndAccessTokenDto> EmployeeLogin(EmployeeLoginDto employeeLoginDto);
    Task EmployeeLogout(RefreshTokenInputDto refreshTokenInputDto);
    Task<AccessTokenDto> EmployeeRefreshAccessToken(RefreshTokenInputDto refreshTokenInputDto);
    Task<Customer> RegisterNewCustomer(CustomerRegisterDto customerRegisterDto);
    Task<AccessTokenDto> CustomerLogin(CustomerLoginDto customerLoginDto);
    Task CustomerChangePassword(string? email, CustomerChangePasswordDto customerChangePasswordDto);
    Task CustomerSendEmailReset(string email);
    Task CustomerResetPassword(string? email, CustomerResetPasswordDto customerResetPasswordDto);
}