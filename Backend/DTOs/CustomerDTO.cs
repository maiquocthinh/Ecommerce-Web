using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class CustomerRegisterDto
{
    [Required(ErrorMessage = "FirstName is required")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "LastName is required")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }

    [Required(ErrorMessage = "PhoneNumber is required")]
    [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid phone number format")]
    public string PhoneNumber { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).*$",
        ErrorMessage =
            "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.")]
    public string Password { get; set; }
}

public class CustomerLoginDto
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
}