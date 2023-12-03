using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface IOrderService
{
    Task<IEnumerable<OrderInfoDto>> GetAllOrderOfCustomer(string? orderStatus = "all");
    Task CancelOrderOfCustomer(int orderId);
    Task ChangeDeliveryAddressOfOrder(int orderId, int shippingAddressId);
    Task<IQueryable<OrderInfoDto>> GetListOrders(OrderFilterDto filterDto);
    Task<OrderInfoDto> GetOrderInfo(int orderId);
    Task UpdateOrder(int orderId, OrderUpdateInputDto updateInputDto);
    Task UpdateOrderDetail(int orderDetailId, OrderDetailUpdateInputDto updateInputDto);
}