using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

// Input Dto
public class DiscountFilterDto
{
    public string? ProductName { get; set; } 
    public bool? Active { get; set; }
    public bool? Expired { get; set; }
}


public class DiscountCreateInputDto
{
    [Required(ErrorMessage = "ProductId is required")]
    public int ProductId { get; set; }

    [Required(ErrorMessage = "DiscountPercent is required")]
    public decimal DiscountPercent { get; set; }

    [Required(ErrorMessage = "StartDate is required")]
    public DateTime StartDate { get; set; }

    [Required(ErrorMessage = "EndDate is required")]
    public DateTime EndDate { get; set; }

    [Required(ErrorMessage = "Quantity is required")]
    public int Quantity { get; set; }

    [Required(ErrorMessage = "Active is required")]
    public bool Active { get; set; }
}

public class DiscountUpdateInputDto
{
    public int? ProductId { get; set; }

    public decimal? DiscountPercent { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public int? Quantity { get; set; }

    public bool? Active { get; set; }
}

// Output Dto
public class DiscountDTO: Discount
{
    public string ProductName {  get; set; }
    public bool IsExpired { get; set; }
}
