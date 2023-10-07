using Backend.Data;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("/api/auth")]
public class AuthController: ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("refresh-access-token")]
    public async Task<ActionResult<SuccessResponse<string>>> RefreshAccessToken([FromBody] RefreshAccessTokenDto refreshAccessTokenDto )
    {
        try
        {
            var accessToken = await _authService.RefreshAccessToken(refreshAccessTokenDto);
            return Ok(new SuccessResponse<AccessTokenDto>()
            {
                Message = "Refresh Access Token Success.",
                Data = accessToken
            });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status401Unauthorized, new ErrorResponse()
            {
                Message = e.Message
            });
        }

    }
}