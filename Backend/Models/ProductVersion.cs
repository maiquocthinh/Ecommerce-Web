using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ProductVersion
{
    public long Id { get; set; }

    public long ProductId { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Color { get; set; } = null!;

    public string Specifications { get; set; } = null!;

    public long Price { get; set; }

    public int Inventory { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<ImportBatch> ImportBatches { get; set; } = new List<ImportBatch>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Product Product { get; set; } = null!;

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
