using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class OrderItem
{
    public long Id { get; set; }

    public long OrderId { get; set; }

    public long ProductVersionId { get; set; }

    public int Price { get; set; }

    public int Quantity { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual ProductVersion ProductVersion { get; set; } = null!;
}
