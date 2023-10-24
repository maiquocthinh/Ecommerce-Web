using System.Security.Claims;
using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("/api/auth")]
public class AuthController : BaseController
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("employee/login")]
    public async Task<ActionResult<SuccessResponse<RefreshTokenAndAccessTokenDto>>> EmployeeLogin(
        [FromBody] EmployeeLoginDto employeeLoginDto)
    {
        var tokens = await _authService.EmployeeLogin(employeeLoginDto);
        return Ok(
            RenderSuccessResponse(message: "Login Success.", data: tokens));
    }

    [HttpDelete("employee/logout")]
    public async Task<ActionResult<SuccessResponseWithoutData>> EmployeeLogout(
        [FromBody] RefreshTokenInputDto refreshTokenInputDto)
    {
        await _authService.EmployeeLogout(refreshTokenInputDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Logout Success."));
    }

    [HttpPost("employee/refresh-access-token")]
    public async Task<ActionResult<SuccessResponse<AccessTokenDto>>> EmployeeRefreshAccessToken(
        [FromBody] RefreshTokenInputDto refreshTokenInputDto)
    {
        var accessToken = await _authService.EmployeeRefreshAccessToken(refreshTokenInputDto);
        return Ok(
            RenderSuccessResponse(message: "Refresh Access Token Success.", data: accessToken));
    }

    [HttpPost("customer/register")]
    public async Task<ActionResult<SuccessResponse<Customer>>> CustomerRegister(
        [FromBody] CustomerRegisterDto customerRegisterDto)
    {
        var newCustomer = await _authService.RegisterNewCustomer(customerRegisterDto);
        return Ok(RenderSuccessResponse(message: "Register success.", data: newCustomer));
    }

    [HttpPost("customer/login")]
    public async Task<ActionResult<SuccessResponse<AccessTokenDto>>> CustomerLogin(
        [FromBody] CustomerLoginDto customerLoginDto)
    {
        var token = await _authService.CustomerLogin(customerLoginDto);
        return Ok(RenderSuccessResponse(message: "Login success.", data: token));
    }

    [PermissionAuthorize(Permissions.ResetPassword)]
    [HttpPost("customer/change-password")]
    public async Task<ActionResult<SuccessResponseWithoutData>> CustomerChangePassword(
        [FromBody] CustomerChangePasswordDto customerChangePasswordDto)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        await _authService.CustomerChangePassword(email, customerChangePasswordDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Change password success."));
    }

    [HttpPost("customer/request-reset-password")]
    public async Task<ActionResult<SuccessResponseWithoutData>> CustomerRequestResetPassword(
        [FromBody] CustomerRequestResetPasswordDto customerChangePasswordDto)
    {
        await _authService.CustomerSendEmailReset(customerChangePasswordDto.Email);

        return Ok(RenderSuccessResponseWithoutData(message: "Please check your email to reset password."));
    }

    [PermissionAuthorize(Permissions.ResetPassword)]
    [HttpPost("customer/reset-password")]
    public async Task<ActionResult<SuccessResponseWithoutData>> CustomerResetPassword(
        [FromBody] CustomerResetPasswordDto customerResetPasswordDto)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        await _authService.CustomerResetPassword(email, customerResetPasswordDto);

        return Ok(RenderSuccessResponseWithoutData(message: "Reset password success!."));
    }
}