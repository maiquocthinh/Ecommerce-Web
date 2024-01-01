namespace Backend.Infrastructure.RabbitMQ;

public interface IRabbitMQService
{
    void PublishMessage(string queueName, string message);
    void StartConsuming(string queueName, Action<string> messageHandler);
    void Stop();
}