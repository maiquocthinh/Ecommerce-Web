using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Email;
using Backend.Infrastructure.Email.Models;
using Backend.Infrastructure.Email.Templates;
using Backend.Infrastructure.Jwt;
using Backend.Infrastructure.RabbitMQ;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Linq;
using Castle.Core.Resource;
using Backend.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class CheckoutService : ICheckoutService
{
    private readonly HttpContext _httpContext;
    private readonly IRabbitMQService _rabbitMqService;
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderDetailRepository _orderDetailRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly ICartRepository _cartRepository;
    private readonly IProductVersionRepository _productVersionRepository;

    public CheckoutService(IHttpContextAccessor httpContextAccessor, IRabbitMQService rabbitMqService, IOrderRepository orderRepository,
        IOrderDetailRepository orderDetailRepository, ICustomerRepository customerRepository,
        ICartRepository cartRepository, IProductVersionRepository productVersionRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _rabbitMqService = rabbitMqService;
        _orderRepository = orderRepository;
        _orderDetailRepository = orderDetailRepository;
        _customerRepository = customerRepository;
        _cartRepository = cartRepository;
        _productVersionRepository = productVersionRepository;
    }

    public async Task<CheckoutSuccessDto> CheckoutWithCartItems(CheckoutWithCartItemsInputDto checkoutInput)
    {
        // vaidate customer
        var customerId =
            int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");


        // check cartitems & in stock
        var cartItems = await _cartRepository.Where(c => checkoutInput.CartItemsIds.Contains<int>((int)c.Id!));
        var messagesError = new List<string>();

        if (cartItems.IsNullOrEmpty())
            throw new BadRequestException("Notthing to order!");

        foreach (var cartItem in cartItems)
        {
            if (cartItem.Quantity > cartItem.ProductsVersion.Inventory)
                messagesError.Add($"{cartItem.ProductsVersion.Name} is not enough stock");
        }

        if (!messagesError.IsNullOrEmpty())
            throw new ConflictException(message: string.Join("\n", messagesError));

        // get Shipping Info
        var shippingInfo = customer.ShippingAddresses.FirstOrDefault(sa => sa.IsDefault == true);
        var addresss = shippingInfo.Address;

        // create order
        var order = await _orderRepository.Add(new Order
        {
            CustomerId = customerId,
            RecipientName = shippingInfo.RecipientName,
            PhoneNumber = shippingInfo.PhoneNumber,
            Address = $"{addresss.SpecificAddress}, {addresss.Wards}, {addresss.Districts}, {addresss.Province}",
        });
        var orderDetails = cartItems.Select(c =>
        {
            var Discount = c.ProductsVersion.Product.Discounts.FirstOrDefault(d => d.EndDate > DateTime.Now && d.Active == true && d.Quantity > 0);
            var Price = c.ProductsVersion.Price;


            return new OrderDetail
            {
                ImportShipmentId = 1,
                OrderId = (int)order.Id!,
                ProductVersionId = c.ProductsVersionId,
                Quantity = c.Quantity,
                OriginPrice = Price,
                Price = Discount is null ? Price : (int)Math.Round((decimal)(Price * (1 - Discount.DiscountPercent))!) * c.Quantity,
            };
        }).ToList();

        order.TotalPrice = orderDetails.Sum(od => od.Price);
        await _orderRepository.Update(order);

        await _orderDetailRepository.AddMultiple(orderDetails);

        // remove cart items
        await _cartRepository.RemoveMultiple(cartItems);

        // create checkoutSuccessDto
        var checkoutSuccessDto = new CheckoutSuccessDto
        {
            OrderId = (int)order.Id!,
            OrderStatus = order.Status,
            TotalAmount = order.TotalPrice,
            ShippingInfo = new ShippingInfo
            {
                Address = order.Address,
                RecipientName = order.RecipientName,
                PhoneNumber = order.PhoneNumber,
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

        // send email notify
        string emailMessageJson = JsonConvert.SerializeObject(new EmailMessage
        {
            To = customer.Email!,
            Subject = "New Order Notification",
            Model = new NewOrderNotifyModel
            {
                CustomerFirstname = customer.FirstName,
                OrderId = (int)order.Id,
                OrderDate = order.CreatedAt.ToString("HH:mm:ss dd/MM/yy"),
                TotalPrice = order.TotalPrice,
                ShippingInfo = checkoutSuccessDto.ShippingInfo,
                OrderDetails = checkoutSuccessDto.OrderDetails
            },
            TemplateName = EmailTemplates.NewOrderNotify
        });
        _rabbitMqService.PublishMessage(queueName: QueueNames.EmailQueue, message: emailMessageJson);

        // return checkoutSuccessDto
        return checkoutSuccessDto;
    }

    public async Task<CheckoutSuccessDto> CheckoutWithProducts(CheckoutInputDto checkoutInput)
    {
        var deliveryInfo = checkoutInput.DeliveryInfo;

        // check have any product to order?
        if (checkoutInput.Items.IsNullOrEmpty())
            throw new BadRequestException("Notthing to order!");

        // check in stock
        var itemProductVersionIds = checkoutInput.Items.Select(i => (int)i.ProductVersionId).ToList();
        var productVersionsOrder = (await _productVersionRepository.Where(pv => itemProductVersionIds.Contains<int>((int)pv.Id)))
            .Select(pv => new
                {
                    ProductVersion = pv,
                    OrderQuantity = checkoutInput.Items.FirstOrDefault(i => i.ProductVersionId == pv.Id)?.Quantity
                }).ToList();
        var messagesError = new List<string>();

        foreach (var pvo in productVersionsOrder)
        {
            if (pvo.ProductVersion.Inventory < pvo.OrderQuantity)
                messagesError.Add($"{pvo.ProductVersion.Name} is not enough stock.");
        }

        if (!messagesError.IsNullOrEmpty())
            throw new ConflictException(message: string.Join("\n", messagesError));

        // create order
        try
        {
            var order = await _orderRepository.Add(new Order
            {
                RecipientName = deliveryInfo.RecipientName,
                PhoneNumber = deliveryInfo.PhoneNumber,
                Address = $"{deliveryInfo.SpecificAddress}, {deliveryInfo.Wards}, {deliveryInfo.Districts}, {deliveryInfo.Province}",
            });
            var orderDetails = productVersionsOrder.Select(pvo =>
            {
                var Discount = pvo.ProductVersion.Product.Discounts.FirstOrDefault(d => d.EndDate > DateTime.Now && d.Active == true && d.Quantity > 0);
                var Price = pvo.ProductVersion.Price;
                return new OrderDetail
                {
                    OrderId = (int)order.Id!,
                    ProductVersionId = pvo.ProductVersion.Id,
                    Quantity = (int)pvo.OrderQuantity!,
                    OriginPrice = Price,
                    Price = Discount is null ? Price : (int)Math.Round((decimal)(Price * (1 - Discount.DiscountPercent))!) * (int)pvo.OrderQuantity,
                };
            }).ToList();

            order.TotalPrice = orderDetails.Sum(od => od.Price);
            await _orderRepository.Update(order);

            await _orderDetailRepository.AddMultiple(orderDetails);

            // create checkoutSuccessDto
            var checkoutSuccessDto = new CheckoutSuccessDto
            {
                OrderId = (int)order.Id!,
                OrderStatus = order.Status,
                TotalAmount = order.TotalPrice,
                ShippingInfo = new ShippingInfo
                {
                    Address = order.Address,
                    RecipientName = order.RecipientName,
                    PhoneNumber = order.PhoneNumber,
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

            // send email notify
            string emailMessageJson = JsonConvert.SerializeObject(new EmailMessage
            {
                To = deliveryInfo.Email!,
                Subject = "New Order Notification",
                Model = new NewOrderNotifyModel
                {
                    CustomerFirstname = deliveryInfo.RecipientName,
                    OrderId = (int)order.Id,
                    OrderDate = order.CreatedAt.ToString("HH:mm:ss dd/MM/yy"),
                    TotalPrice = order.TotalPrice,
                    ShippingInfo = checkoutSuccessDto.ShippingInfo,
                    OrderDetails = checkoutSuccessDto.OrderDetails
                },
                TemplateName = EmailTemplates.NewOrderNotify
            });
            _rabbitMqService.PublishMessage(queueName: QueueNames.EmailQueue, message: emailMessageJson);

            // return checkoutSuccessDto
            return checkoutSuccessDto;
        }
        catch (DbUpdateException e)
        {
            if (e.InnerException is SqlException sqlException)
                foreach (SqlError error in sqlException.Errors)
                    if (error.Number == 50000)
                        throw new BadRequestException(error.Message);
        }

        return null;
    }

}