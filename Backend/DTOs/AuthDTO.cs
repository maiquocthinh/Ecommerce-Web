using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

// Input Dto
public class RefreshTokenInputDto
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}
// Output Dto
public class AccessTokenDto
{
    public string AccessToken { get; set; } = string.Empty;
    public DateTime AccessTokenExpiredIn { get; set; }
}

public class RefreshTokenAndAccessTokenDto
{
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpiredIn { get; set; }

    public string AccessToken { get; set; } = string.Empty;
    public DateTime AccessTokenExpiredIn { get; set; }
}
