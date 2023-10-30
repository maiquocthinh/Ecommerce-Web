using Backend.DTOs;

namespace Backend.Infrastructure.Email.Models;

public class NewOrderNotifyModel
{
    public required string CustomerFirstname { get; set; }
    public required int OrderId { get; set; }
    public required string OrderDate { get; set; }
    public required int TotalPrice { get; set; }
    public string Currency { get; set; } = "VND";
    public required ShippingInfo ShippingInfo { get; set; }
    public required IEnumerable<_OrderDetail> OrderDetails{ get; set; }
}