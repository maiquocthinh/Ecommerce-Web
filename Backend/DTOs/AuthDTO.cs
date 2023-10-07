using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class RefreshAccessTokenDto
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}
public class AccessTokenDto
{
    [Required]
    public string AccessToken { get; set; } = string.Empty;
}