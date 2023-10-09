using Backend.Data;
using Backend.DTOs;
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

    [HttpPost("refresh-access-token")]
    public async Task<ActionResult<SuccessResponse<string>>> RefreshAccessToken(
        [FromBody] RefreshAccessTokenDto refreshAccessTokenDto)
    {
        try
        {
            var accessToken = await _authService.RefreshAccessToken(refreshAccessTokenDto);
            return Ok(
                RenderSuccessResponse<AccessTokenDto>(message: "Refresh Access Token Success.", data: accessToken));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status401Unauthorized, new ErrorResponse()
            {
                Message = e.Message
            });
        }
    }

    [HttpPost("customer/register")]
    public async Task<ActionResult<SuccessResponse<string>>> CustomerRegister(
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
}