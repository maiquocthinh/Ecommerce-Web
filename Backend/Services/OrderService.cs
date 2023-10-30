using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Email.Models;
using Backend.Infrastructure.Email.Templates;
using Backend.Infrastructure.Jwt;
using Backend.Infrastructure.RabbitMQ;
using Backend.Models;
using Backend.Repositories;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Backend.Services;

public class OrderService : IOrderService
{
    private readonly HttpContext _httpContext;
    private readonly IOrderRepository _orderRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly IRabbitMQService _rabbitMqService;

    public OrderService(IHttpContextAccessor httpContextAccessor, IOrderRepository orderRepository, ICustomerRepository customerRepository, IRabbitMQService rabbitMqService)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _orderRepository = orderRepository;
        _customerRepository = customerRepository;
        _rabbitMqService = rabbitMqService;
    }

    public async Task<IEnumerable<OrderInfoDto>> GetAllOrderOfCustomer(string? orderStatus = "all")
    {
        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        IEnumerable<Order> orders;
        switch (orderStatus)
        {
            case OrderStatus.Processing:
                orders = await _orderRepository.Where(o => o.CustomerId == customerId && o.Status == OrderStatus.Processing);
                break;
            case OrderStatus.Cancelled:
                orders = await _orderRepository.Where(o => o.CustomerId == customerId && o.Status == OrderStatus.Cancelled);
                break;
            case OrderStatus.Shipped:
                orders = await _orderRepository.Where(o => o.CustomerId == customerId && o.Status == OrderStatus.Shipped);
                break;
            case OrderStatus.Delivering:
                orders = await _orderRepository.Where(o => o.CustomerId == customerId && o.Status == OrderStatus.Delivering);
                break;
            default:
                orders = await _orderRepository.Where(o => o.CustomerId == customerId);
                break;
        }

        return orders.OrderByDescending(o => o.CreatedAt).Select(o =>
        {
            var orderDetails = o.OrderDetails;

            return new OrderInfoDto
            { 
                OrderId = (int)o.Id!,
                OrderStatus = o.Status,
                TotalAmount = orderDetails.Sum(od => od.Price),
                ShippingInfo = new ShippingInfo
                {
                    Address = o.Address,
                    RecipientName = o.RecipientName,
                    PhoneNumber = o.PhoneNumber,
                },
                OrderDetails = orderDetails.Select(od => new _OrderDetail
                {
                    ProductVersionId = od.ProductVersionId,
                    ProductVersionName = od.ProductVersion.Name,
                    Quantity = od.Quantity,
                    OriginPrice = od.OriginPrice,
                    Price = od.Price,
                    TotalPrice = od.Price * od.Quantity,
                })
            };
        });
    }


    public async Task CancelOrderOfCustomer(int orderId)
    {
        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        var order = await _orderRepository.GetById(orderId);
        if (order is null && order.CustomerId != customerId) throw new NotFoundException("Order not found!");
        order.Status = OrderStatus.Cancelled;

        try { 
            await _orderRepository.Update(order);
        }
        catch (DbUpdateException e)
        {
            if (e.InnerException is SqlException sqlException)
                foreach (SqlError error in sqlException.Errors)
                    if (error.Number == 50000)
                        throw new BadRequestException(error.Message);
        }

        // send email notify
        string emailMessageJson = JsonConvert.SerializeObject(new EmailMessage
        {
            To = customer.Email!,
            Subject = "Order Cancellation Notifications",
            Model = new CustomerCancelOrderModel
            {
                CustomerFirstname = customer.FirstName,
                OrderId = (int)order.Id,
                TotalPrice = order.TotalPrice,
                OrderDetails = order.OrderDetails.Select(od => new _OrderDetail
                {
                    ProductVersionId = od.ProductVersionId,
                    ProductVersionName = od.ProductVersion.Name,
                    Quantity = od.Quantity,
                    OriginPrice = od.OriginPrice,
                    Price = od.Price,
                    TotalPrice = od.Price * od.Quantity,
                })
            },
            TemplateName = EmailTemplates.CustomerCancelOrder
        });
        
        _rabbitMqService.PublishMessage(queueName: QueueNames.EmailQueue, message: emailMessageJson);
    }
}