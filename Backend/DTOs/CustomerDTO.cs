using System.ComponentModel.DataAnnotations;
using Backend.Models;

namespace Backend.DTOs;

// Input dtos

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
    [RegularExpression(@"^\d{1,}$", ErrorMessage = "Invalid phone number format")]
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

public class CustomerChangePasswordDto
{
    [Required(ErrorMessage = "Old Password is required")]
    public string OldPassword { get; set; }

    [Required(ErrorMessage = "New Password is required")]
    [MinLength(8, ErrorMessage = "New Password must be at least 8 characters")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).*$",
        ErrorMessage =
            "New Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.")]
    public string NewPassword { get; set; }
}

public class CustomerRequestResetPasswordDto
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }
}

public class CustomerResetPasswordDto
{
    [Required(ErrorMessage = "New Password is required")]
    [MinLength(8, ErrorMessage = "New Password must be at least 8 characters")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).*$",
        ErrorMessage =
            "New Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.")]
    public string Password { get; set; }
}

public class CustomerProfileUpdateDto
{
    [MinLength(2, ErrorMessage = "First name must be at least 2 characters")]
    [StringLength(30, ErrorMessage = "First name must be at most 30 characters")]
    public string? FirstName { get; set; }

    [MinLength(2, ErrorMessage = "Last name must be at least 2 characters")]
    [StringLength(20, ErrorMessage = "Last name must be at most 20 characters")]
    public string? LastName { get; set; }

    public bool? Gender { get; set; } = null;

    public DateTime? DayOfBirth { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string? Email { get; set; }

    [RegularExpression(@"^\d{1,}$", ErrorMessage = "Invalid phone number format")]
    public string? PhoneNumber { get; set; }

    [Url(ErrorMessage = "Invalid URL")]
    public string? Avatar { get; set; }
}


// Output dtos

public class CustomerProfileDto
{
    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public bool Gender { get; set; }

    public DateTime DayOfBirth { get; set; }

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Avatar { get; set; } = string.Empty;
}
