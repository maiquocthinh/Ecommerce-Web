using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace Backend.Infrastructure.RabbitMQ;

public class RabbitMQService: IRabbitMQService
{
    private readonly IConnection _connection;
    private readonly IModel _channel;

    public RabbitMQService(IConfiguration configuration)
    {
        var factory = new ConnectionFactory
        {
            Uri = new Uri(configuration.GetValue<string>("RabbitMQUri") ?? string.Empty)
        };

        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
    }

    public void StartConsuming(string queueName, Action<string> messageHandler)
    {
        _channel.QueueDeclare(queue: queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);

        var consumer = new EventingBasicConsumer(_channel);
        consumer.Received += (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            messageHandler(message);
        };

        _channel.BasicConsume(queue: queueName, autoAck: true, consumer: consumer);
    }

    public void PublishMessage(string queueName, string message)
    {
        var body = Encoding.UTF8.GetBytes(message);

        _channel.QueueDeclare(queue: queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);

        _channel.BasicPublish(exchange: "", routingKey: queueName, basicProperties: null, body: body);
    }

    public void Stop()
    {
        _channel.Close(200, "Goodbye");
        _connection.Close();
    }
}
