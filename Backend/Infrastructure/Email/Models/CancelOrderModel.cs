using Backend.DTOs;

namespace Backend.Infrastructure.Email.Models;

public class CancelOrderModel
{
    public required string CustomerFirstname { get; set; }
    public required int OrderId { get; set; }
    public required int TotalPrice { get; set; }
    public string Currency { get; set; } = "VND";
    public required IEnumerable<_OrderDetail> OrderDetails{ get; set; }
}