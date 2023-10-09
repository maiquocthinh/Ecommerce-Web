using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IAuthService
{
    Task<AccessTokenDto> RefreshAccessToken(RefreshAccessTokenDto refreshAccessTokenDto);
    Task<Customer> RegisterNewCustomer(CustomerRegisterDto customerRegisterDto);
    Task<AccessTokenDto> CustomerLogin(CustomerLoginDto customerLoginDto);
}