using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Order
{
    public long Id { get; set; }

    public string Status { get; set; } = null!;

    public long EmployeeId { get; set; }

    public long CustomerId { get; set; }

    public string CustomerFullname { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int TotalPrice { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
