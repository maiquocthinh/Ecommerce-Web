using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Employee
{
    public long Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public bool? Gender { get; set; }

    public DateTime Birthday { get; set; }

    public string CitizenId { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string HashedPassword { get; set; } = null!;

    public string? Avatar { get; set; }

    public long AddressId { get; set; }

    public long RoleId { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual ICollection<Import> Imports { get; set; } = new List<Import>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<ReviewsReply> ReviewsReplies { get; set; } = new List<ReviewsReply>();

    public virtual Role Role { get; set; } = null!;
}
