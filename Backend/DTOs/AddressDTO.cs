using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;


// Input dtos

public class ShippingAddressUpdateDto
{
    public string? SpecificAddress { get; set; } = null;

    public string? Province { get; set; } = null;

    public string? Districts { get; set; } = null;

    public string? Wards { get; set; } = null;

    public string? RecipientName { get; set; } = null;

    public string? PhoneNumber { get; set; }  = null;

    public bool? IsDefault { get; set; }
}

public class ShippingAddressCreateDto
{
    [Required(ErrorMessage = "SpecificAddress is required")]
    public string SpecificAddress { get; set; }

    [Required(ErrorMessage = "Province is required")]
    public string Province { get; set; }

    [Required(ErrorMessage = "Districts is required")]
    public string Districts { get; set; }

    [Required(ErrorMessage = "Wards is required")]
    public string Wards { get; set; }

    [Required(ErrorMessage = "RecipientName is required")]
    public string RecipientName { get; set; }

    [Required(ErrorMessage = "PhoneNumber is required")]
    public string PhoneNumber { get; set; }

    public bool? IsDefault { get; set; }
}

// Output dtos

public class ShippingAddressDto : ShippingAddressCreateDto
{
    public long Id { get; set; }
}