using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

//Input Dto
public class EmployeeLoginDto
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
}

public class EmployeeFilterDto
{
    public string? Keyword { get; set; }
    public int? RoleId { get; set; }
}


public class EmployeeCreateInputDto
{
    [Required(ErrorMessage = "FirstName is required")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "LastName is required")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Gender is required")]
    public bool Gender { get; set; }

    [Required(ErrorMessage = "DayOfBirth is required")]
    public DateTime DayOfBirth { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }

    [Required(ErrorMessage = "PhoneNumber is required")]
    public string PhoneNumber { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }

    [Required(ErrorMessage = "AvatarUrl is required")]
    [Url(ErrorMessage = "Invalid URL")]
    public string? AvatarUrl { get; set; }

    [Required(ErrorMessage = "Active is required")]
    public bool Active { get; set; }

    [Required(ErrorMessage = "Address is required")]
    public AddressCreateInputDto Address { get; set; }

    [Required(ErrorMessage = "RoleId is required")]
    public int RoleId { get; set; }
}

public class EmployeeUpdateInputDto
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public bool? Gender { get; set; }

    public DateTime? DayOfBirth { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Password { get; set; }

    [Url(ErrorMessage = "Invalid URL")]
    public string? AvatarUrl { get; set; }

    public bool? Active { get; set; }

    public AddressUpdateInputDto? Address { get; set; }

    public int? RoleId { get; set; }
}

//Output Dto


public class EmployeeShortDto
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public bool Gender { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }

    public string AvatarUrl { get; set; }

    public bool Active { get; set; }

    public int RoleId { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }
}

public class EmployeeDetailDto: EmployeeShortDto
{
    public DateTime DayOfBirth { get; set; }

    public AddressDto Address { get; set; }
}