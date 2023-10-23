using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Supplier
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int AddressId { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual ICollection<Import> Imports { get; set; } = new List<Import>();
}
