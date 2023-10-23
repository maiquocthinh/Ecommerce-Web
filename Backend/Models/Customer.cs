using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class Customer
{
    public int? Id { get; set; } = null;

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public bool? Gender { get; set; }

    public DateTime? DayOfBirth { get; set; }

    public string Email { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    [JsonIgnore]
    public string? HashedPassword { get; set; }

    public string? AvatarUrl { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<ShippingAddress> ShippingAddresses { get; set; } = new List<ShippingAddress>();
}
