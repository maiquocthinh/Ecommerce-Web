using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

// Input DTO

public class CheckoutWithCartItemsInputDto
{
    [Required(ErrorMessage = "CartItemsIds is required")]
    public IEnumerable<int> CartItemsIds { get; set; }

    public int? ShippingAddressesId { get; set; }
}

public class CheckoutWithProductsInputDto
{
    [Required(ErrorMessage = "Items is required")]
    public IEnumerable<CheckoutProductItem> Items { get; set; }

    public int? ShippingAddressesId { get; set; }
}

public class CheckoutInputDto
{
    [Required(ErrorMessage = "Items is required")]
    public IEnumerable<CheckoutProductItem> Items { get; set; }

    [Required(ErrorMessage = "DeliveryInfo is required")]
    public DeliveryInfo DeliveryInfo { get; set; }
}

// Output DTO
public class CheckoutSuccessDto
{
    public int OrderId { get; set; }

    public string OrderStatus { get; set; }

    public int TotalAmount { get; set; }

    public IEnumerable<_OrderDetail> OrderDetails { get; set; }

    public ShippingInfo ShippingInfo { get; set; }

}

// Subclass
public class DeliveryInfo
{
    [Required(ErrorMessage = "Recipient Name is required.")]
    public string RecipientName { get; set; }

    [Required(ErrorMessage = "PhoneNumber is required")]
    [RegularExpression(@"^\d{1,}$", ErrorMessage = "Invalid phone number format")]
    public string PhoneNumber { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Specific Address is required.")]
    public string SpecificAddress { get; set; }

    [Required(ErrorMessage = "Province is required.")]
    public string Province { get; set; }

    [Required(ErrorMessage = "District is required.")]
    public string Districts { get; set; }

    [Required(ErrorMessage = "Ward is required.")]
    public string Wards { get; set; }
}

public class CheckoutProductItem
{
    [Required(ErrorMessage = "ProductVersionId Name is required.")]
    public int ProductVersionId { get; set; }

    [Required(ErrorMessage = "Quantity Name is required.")]
    public int Quantity { get; set; }
}

public class ShippingInfo
{
    public string RecipientName { get; set; }

    public string PhoneNumber { get; set; }

    public string Address { get; set; }
}

public class _OrderDetail
{
    public int ProductVersionId { get; set; }

    public string ProductVersionName { get; set; }

    public int Quantity { get; set; }

    public int Price { get; set; }

    public int OriginPrice { get; set; }

    public int TotalPrice { get; set; }
}