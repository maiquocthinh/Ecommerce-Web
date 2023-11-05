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
using Castle.Core.Resource;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Backend.Services;

public class OrderService : IOrderService
{
    private readonly HttpContext _httpContext;
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderDetailRepository _orderDetailRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IRabbitMQService _rabbitMqService;

    public OrderService(IHttpContextAccessor httpContextAccessor, IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository,
        ICustomerRepository customerRepository, IEmployeeRepository employeeRepository,IRabbitMQService rabbitMqService)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _orderRepository = orderRepository;
        _orderDetailRepository = orderDetailRepository;
        _customerRepository = customerRepository;
        _employeeRepository = employeeRepository;
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

        try
        {
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
            Model = new CancelOrderModel
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

    public async Task<IQueryable<OrderInfoDto>> ListFilteredOrders(OrderFilterDto filterDto)
    {
        var query = _orderRepository.GetQueryable();

        if (filterDto.CustomerName != null)
        {
            query = query.Where(o => o.RecipientName.Contains(filterDto.CustomerName));
        }

        if (filterDto.Status != null)
        {
            query = query.Where(o => o.Status == filterDto.Status);
        }

        if (filterDto.StartDate != null)
        {
            query = query.Where(o => o.CreatedAt >= filterDto.StartDate);
        }

        if (filterDto.EndDate != null)
        {
            query = query.Where(o => o.CreatedAt <= filterDto.EndDate);
        }

        return query.Select(o => new OrderInfoDto
        {
            OrderId = (int)o.Id!,
            OrderStatus = o.Status,
            TotalAmount = o.OrderDetails.Sum(od => od.Price),
            ShippingInfo = new ShippingInfo
            {
                Address = o.Address,
                RecipientName = o.RecipientName,
                PhoneNumber = o.PhoneNumber,
            },
            OrderDetails = null
        });
    }

    public async Task UpdateOrder(int orderId, OrderUpdateInputDto updateInputDto)
    {
        // validate employee
        int employeeId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.EmployeeId)?.Value);
        var employee = await _employeeRepository.GetById(employeeId);
        if (employee is null) throw new NotFoundException("Employee not found.");

        var order = await _orderRepository.GetById(orderId);
        if (order == null) throw new NotFoundException("Order not found");

        switch (updateInputDto.Status) {
            case OrderStatus.Cancelled:
                order.Status = updateInputDto.Status;
                order.EmployeeId = employeeId;
                await _orderRepository.Update(order);

                if(order.Customer != null)
                {
                    // send email
                    string emailMessageJson = JsonConvert.SerializeObject(new EmailMessage
                    {
                        To = order.Customer.Email,
                        Subject = "Order Cancellation Notifications",
                        Model = new CancelOrderModel
                        {
                            CustomerFirstname = order.Customer.FirstName,
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
                        TemplateName = EmailTemplates.ShopCancelOrder
                    });

                    _rabbitMqService.PublishMessage(queueName: QueueNames.EmailQueue, message: emailMessageJson);
                }
                break;
            case OrderStatus.Delivering:
            case OrderStatus.Shipped:
                order.Status = updateInputDto.Status;
                order.EmployeeId = employeeId;
                await _orderRepository.Update(order);
                break;
        }
    }

    public async Task UpdateOrderDetail(int orderDetailId, OrderDetailUpdateInputDto updateInputDto)
    {
        var orderDetail = await _orderDetailRepository.GetById(orderDetailId);
        if (orderDetail == null) throw new NotFoundException("Order Detail not found.");

        orderDetail.ImportShipmentId = updateInputDto.ImportShipmentId;

        await _orderDetailRepository.Update(orderDetail);
    }

    public async Task<OrderInfoDto> GetOrderInfo(int orderId)
    {
        var order = await _orderRepository.GetById(orderId);
        if (order == null) throw new NotFoundException("Order not found.");

        return new OrderInfoDto
        {
            OrderId = (int)order.Id!,
            OrderStatus = order.Status,
            TotalAmount = order.OrderDetails.Sum(od => od.Price),
            ShippingInfo = new ShippingInfo
            {
                Address = order.Address,
                RecipientName = order.RecipientName,
                PhoneNumber = order.PhoneNumber,
            },
            OrderDetails = order.OrderDetails.Select(od => new _OrderDetail
            {
                ProductVersionId = od.ProductVersionId,
                ProductVersionName = od.ProductVersion.Name,
                Quantity = od.Quantity,
                OriginPrice = od.OriginPrice,
                Price = od.Price,
                TotalPrice = od.Price * od.Quantity,
            })
        };
    }
}