using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ShippingAddress
{
    public int? Id { get; set; } = null;

    public int CustomerId { get; set; }

    public int AddressId { get; set; }

    public string RecipientName { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public bool? IsDefault { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual Customer Customer { get; set; } = null!;
}
