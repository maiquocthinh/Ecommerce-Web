namespace Backend.Infrastructure.Email.Models;

public class EmailMessage
{
    public required string To { get; set; }
    public required string Subject { get; set; }
    public required object Model { get; set; }
    public required string TemplateName { get; set; }
}