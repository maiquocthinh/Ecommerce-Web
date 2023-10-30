using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Order
{
    public int? Id { get; set; }

    public string Status { get; set; } = null!;

    public int? EmployeeId { get; set; }

    public int? CustomerId { get; set; }

    public string RecipientName { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int TotalPrice { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Customer? Customer { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
