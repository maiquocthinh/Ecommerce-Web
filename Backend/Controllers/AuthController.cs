using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

    [AllowAnonymous]
    [HttpPost("employee/login")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<RefreshTokenAndAccessTokenDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> EmployeeLogin([FromBody] EmployeeLoginDto employeeLoginDto)
    {
        var tokens = await _authService.EmployeeLogin(employeeLoginDto);
        return Ok(RenderSuccessResponse(message: "Login Success.", data: tokens));
    }

    [AllowAnonymous]
    [HttpDelete("employee/logout")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> EmployeeLogout([FromBody] RefreshTokenInputDto refreshTokenInputDto)
    {
        await _authService.EmployeeLogout(refreshTokenInputDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Logout Success."));
    }

    [AllowAnonymous]
    [HttpPost("employee/refresh-access-token")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<SuccessResponse<AccessTokenDto>>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> EmployeeRefreshAccessToken([FromBody] RefreshTokenInputDto refreshTokenInputDto)
    {
        var accessToken = await _authService.EmployeeRefreshAccessToken(refreshTokenInputDto);
        return Ok(RenderSuccessResponse(message: "Refresh Access Token Success.", data: accessToken));
    }

    [AllowAnonymous]
    [HttpPost("customer/register")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<SuccessResponse<Customer>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CustomerRegister([FromBody] CustomerRegisterDto customerRegisterDto)
    {
        var newCustomer = await _authService.RegisterNewCustomer(customerRegisterDto);
        return Ok(RenderSuccessResponse(message: "Register success.", data: newCustomer));
    }

    [AllowAnonymous]
    [HttpPost("customer/login")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<SuccessResponse<AccessTokenDto>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CustomerLogin([FromBody] CustomerLoginDto customerLoginDto)
    {
        var token = await _authService.CustomerLogin(customerLoginDto);
        return Ok(RenderSuccessResponse(message: "Login success.", data: token));
    }

    [PermissionAuthorize(Permissions.ResetPassword)]
    [HttpPost("customer/change-password")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<SuccessResponseWithoutData>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CustomerChangePassword([FromBody] CustomerChangePasswordDto customerChangePasswordDto)
    {
        await _authService.CustomerChangePassword(customerChangePasswordDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Change password success."));
    }

    [AllowAnonymous]
    [HttpPost("customer/request-reset-password")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CustomerRequestResetPassword([FromBody] CustomerRequestResetPasswordDto customerChangePasswordDto)
    {
        await _authService.CustomerSendEmailReset(customerChangePasswordDto.Email);

        return Ok(RenderSuccessResponseWithoutData(message: "Please check your email to reset password."));
    }

    [PermissionAuthorize(Permissions.ResetPassword)]
    [HttpPost("customer/reset-password")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CustomerResetPassword([FromBody] CustomerResetPasswordDto customerResetPasswordDto)
    {
        await _authService.CustomerResetPassword(customerResetPasswordDto);

        return Ok(RenderSuccessResponseWithoutData(message: "Reset password success!."));
    }
}