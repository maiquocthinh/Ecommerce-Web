using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public bool Gender { get; set; }

    public DateTime DayOfBirth { get; set; }

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    [JsonIgnore]
    public string HashedPassword { get; set; } = null!;

    public string? AvatarUrl { get; set; }

    public bool Active { get; set; }

    public int AddressId { get; set; }

    public int RoleId { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual ICollection<Import> Imports { get; set; } = new List<Import>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public virtual ICollection<ReviewsReply> ReviewsReplies { get; set; } = new List<ReviewsReply>();

    public virtual Role Role { get; set; } = null!;
}
