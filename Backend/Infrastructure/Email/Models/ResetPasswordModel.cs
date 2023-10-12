namespace Backend.Infrastructure.Email.Models;

public class ResetPasswordModel
{
    public required string SiteUrl { get; set; }
    public required string Firstname { get; set; }
    public required string Token { get; set; }
}