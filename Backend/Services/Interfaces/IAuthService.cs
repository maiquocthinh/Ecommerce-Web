using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface IAuthService
{
    Task<AccessTokenDto> RefreshAccessToken(RefreshAccessTokenDto refreshAccessTokenDto);
}