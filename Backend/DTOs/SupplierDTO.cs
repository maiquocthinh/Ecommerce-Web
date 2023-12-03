using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

//Input Dto
public class SupplierFilterDto
{
    public string? Keyword { get; set; }
}

public class SupplierCreateInputDto
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }

    [Required(ErrorMessage = "PhoneNumber is required")]
    public string PhoneNumber { get; set; }

    [Required(ErrorMessage = "Address is required")]
    public AddressCreateInputDto Address { get; set; }
}

public class SupplierUpdateInputDto
{
    public string? Name { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public AddressCreateInputDto? Address { get; set; }
}



//Output Dto

public class SupplierTinyDto
{
    public int Id { get; set; }

    public string Name { get; set; }
}

public class SupplierDto
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }
}

public class SupplierDetailDto: SupplierDto
{
    public AddressDto Address { get; set; }
}



