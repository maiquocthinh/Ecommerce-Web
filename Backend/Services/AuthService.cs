using System.Collections.Immutable;
using System.Security.Claims;
using Backend.DTOs;
using Backend.Infrastructure.Jwt;
using Backend.Respositories.Interfaces;
using Backend.Services.Interfaces;

namespace Backend.Services;

public class AuthService : IAuthService
{
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly JwtUtil _jwtUtil;
    private readonly string _employeeAccessTokenExpired;

    public AuthService(IConfiguration configuration, IRefreshTokenRepository refreshTokenRepository, JwtUtil jwtUtil)
    {
        _refreshTokenRepository = refreshTokenRepository;
        _jwtUtil = jwtUtil;
        _employeeAccessTokenExpired = configuration["Jwt:EmployeeAccessTokenExpired"] ?? string.Empty;
    }

    public async Task<AccessTokenDto> RefreshAccessToken(RefreshAccessTokenDto refreshAccessTokenDto)
    {
        // jwt decode
        var claims = _jwtUtil.ValidateToken(refreshAccessTokenDto.RefreshToken);
        // find and compare with refresh token in db
        string? refreshTokenId = claims?.Find(c => c.Type == AppClaimTypes.RefreshTokenId)?.Value;
        if (refreshTokenId is null) throw new Exception("Refresh Token Invalid");
        var refreshToken = await _refreshTokenRepository.GetById(new Guid(refreshTokenId));
        if (refreshToken?.Token != refreshAccessTokenDto.RefreshToken && refreshToken?.ExpiresAt > DateTime.Now)
            throw new Exception("Refresh Token Invalid");

        // get info need to create new token
        var employee = refreshToken?.Employee;
        if (employee is null) throw new Exception("Cannot Refresh Access Token");

        // gen access token
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
}