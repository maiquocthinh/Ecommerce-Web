using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Discount
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public decimal? DiscountPercent { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public int Quantity { get; set; }

    public bool? Active { get; set; }

    public virtual Product Product { get; set; } = null!;
}
