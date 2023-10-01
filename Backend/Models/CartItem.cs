using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class CartItem
{
    public long Id { get; set; }

    public int Quantity { get; set; }

    public long CustomerId { get; set; }

    public long ProductsVersionsId { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual ProductVersion ProductsVersions { get; set; } = null!;
}
