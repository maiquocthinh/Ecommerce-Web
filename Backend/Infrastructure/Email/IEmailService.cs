using Backend.Infrastructure.Email.Models;

namespace Backend.Infrastructure.Email;

public interface IEmailService
{
    Task SendEmailAsync(EmailMessage emailMessage);
}