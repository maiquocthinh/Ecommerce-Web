using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class Customer
{
    public long? Id { get; set; } = null;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public bool Gender { get; set; }

    public DateTime? DayOfBirth { get; set; } = null;

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    [JsonIgnore]
    public string? HashedPassword { get; set; }

    public string? Avatar { get; set; } = string.Empty;

    [JsonIgnore]
    public long? AddressId { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Address? Address { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<CustomerShippingContact> CustomerShippingContacts { get; set; } = new List<CustomerShippingContact>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
