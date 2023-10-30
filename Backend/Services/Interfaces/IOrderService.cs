using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface IOrderService
{
    Task<IEnumerable<OrderInfoDto>> GetAllOrderOfCustomer(string? orderStatus = "all");
    Task CancelOrderOfCustomer(int orderId);
}