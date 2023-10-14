using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class RefreshTokenInputDto
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}
public class AccessTokenDto
{
    [Required]
    public string AccessToken { get; set; } = string.Empty;
}
public class RefreshTokenAndAccessTokenDto
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
    [Required]
    public string AccessToken { get; set; } = string.Empty;
}