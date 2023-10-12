using Backend.Infrastructure.Email.Models;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using RazorEngine;
using RazorEngine.Templating;

namespace Backend.Infrastructure.Email;

public class EmailService : IEmailService
{
    private readonly string _clientId;
    private readonly string _clientSecret;
    private readonly string _refreshToken;
    private readonly UserCredential _credential;
    private readonly GmailService _service;

    public EmailService(IConfiguration configuration)
    {
        _clientId = configuration["Gmail:ClientId"] ?? string.Empty;
        _clientSecret = configuration["Gmail:ClientSecret"] ?? string.Empty;
        _refreshToken = configuration["Gmail:RefreshToken"] ?? string.Empty;

        _credential = new UserCredential(
            new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = _clientId,
                    ClientSecret = _clientSecret
                }
            }),
            "user",
            new TokenResponse
            {
                RefreshToken = _refreshToken
            });

        _service = new GmailService(new BaseClientService.Initializer
        {
            HttpClientInitializer = _credential,
            ApplicationName = "EmailService",
        });
    }

    public async Task SendEmailAsync(EmailMessage emailMessage)
    {
        string htmlBody = RenderEmailFromTemplate(emailMessage.TemplateName, emailMessage.Model);
        
        string rawEmail = $"To: {emailMessage.To}\r\n" +
                          $"Subject: {emailMessage.Subject}\r\n" +
                          "Content-Type: text/html; charset=UTF-8\r\n\r\n" + 
                          $"{htmlBody}";
        
        var message = new Message { Raw = Base64UrlEncode(rawEmail) };

        var request = _service.Users.Messages.Send(message, "me");
        await request.ExecuteAsync();
    }

    private string RenderEmailFromTemplate(string templateName, object model)
    {
        string templateFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Infrastructure/Email/Templates", templateName + ".cshtml");
        string templateContent = File.ReadAllText(templateFilePath);

        string emailBody = Engine.Razor.RunCompile(templateContent, "templateKey", null, model);

        return emailBody;
    }

    private string Base64UrlEncode(string input)
    {
        byte[] inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
        return Convert.ToBase64String(inputBytes).Replace('+', '-').Replace('/', '_');
    }
}