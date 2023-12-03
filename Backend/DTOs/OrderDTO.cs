using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

// Input DTO
public class OrderFilterDto
{
    public string? CustomerName { get; set; }

    public string? Status { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }
}

public class OrderUpdateInputDto
{
    [Required(ErrorMessage = "Status is required")]
    public string Status { get; set; }
}


public class OrderUpdateShippingInfoInputDto
{
    [Required(ErrorMessage = "ShippingAddressId is required")]
    public int ShippingAddressId { get; set; }

}

public class OrderDetailUpdateInputDto
{
    [Required(ErrorMessage = "ImportShipmentId is required")]
    public int ImportShipmentId { get; set; }
}

// Output DTO
public class OrderInfoDto: CheckoutSuccessDto
{
    public IEnumerable<__OrderDetail> OrderDetails { get; set; }
}

// Subclass
public class __OrderDetail: _OrderDetail
{
    public int Id { get; set; }

    public string ImageUrl { get; set; }
}