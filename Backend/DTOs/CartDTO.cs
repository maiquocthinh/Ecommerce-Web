using System.Collections.Immutable;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

// Input Dto
public class CartUpdateDto
{
    [Required(ErrorMessage = "Quantity is required")]
    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be positive")]
    public int Quantity { get; set; }
}

public class CartAddDto : CartUpdateDto
{
    [Required(ErrorMessage = "ProductVersionId is required")]
    public int ProductVersionId { get; set; }
}

// Out Dto

public class CartDto
{
    public ImmutableList<CartItemDetail>? Items  { get; set; }
    public int TotalItems { get; set; }
}

// SubClass
public class CartItemDetail
{
    public int Id { get; set; }
    public int ProductVersionId { get; set; }
    public string Name { get; set; }
    public string Image { get; set; }
    public string Color { get; set; }
    public int Quantity { get; set; }
    public int InStock { get; set; }
    public CartPrices Prices { get; set; }
}
public class CartPrices
{
    public bool IsDiscount { get; set; }
    public int OriginalPrice { get; set; }
    public int Price { get; set; }
}
