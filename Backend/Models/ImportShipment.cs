using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ImportShipment
{
    public int Id { get; set; }

    public int ImportId { get; set; }

    public int ProductVersionId { get; set; }

    public int Quantity { get; set; }

    public int Remaining { get; set; }

    public int Cost { get; set; }

    public virtual Import Import { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ProductVersion ProductVersion { get; set; } = null!;
}
