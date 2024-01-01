using Backend.Infrastructure.Email;
using Backend.Infrastructure.Email.Models;
using Backend.Infrastructure.RabbitMQ;
using Newtonsoft.Json;

namespace Backend.Infrastructure.BackgroundJobs.Email;

public class EmailWorker : BackgroundService
{
    private readonly IRabbitMQService _rabbitMqService;
    private readonly IEmailService _emailService;

    public EmailWorker(IRabbitMQService rabbitMqService, IEmailService emailService)
    {
        _rabbitMqService = rabbitMqService;
        _emailService = emailService;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _rabbitMqService.StartConsuming(queueName: QueueNames.EmailQueue, messageHandler: async message =>
        {
            var emailMessage = JsonConvert.DeserializeObject<EmailMessage>(message);
            if (emailMessage != null) await _emailService.SendEmailAsync(emailMessage);
        });

        await Task.Delay(Timeout.Infinite, stoppingToken);
    }
}