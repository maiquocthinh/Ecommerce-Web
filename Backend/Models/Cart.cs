using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Cart
{
    public int Id { get; set; }

    public int Quantity { get; set; }

    public int CustomerId { get; set; }

    public int ProductsVersionsId { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual ProductVersion ProductsVersions { get; set; } = null!;
}
