using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class OrderDetail
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public int ProductVersionId { get; set; }

    public int ImportShipmentId { get; set; }

    public int Price { get; set; }

    public int Quantity { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ImportShipment ImportShipment { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;

    public virtual ProductVersion ProductVersion { get; set; } = null!;
}
