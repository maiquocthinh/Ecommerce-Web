using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ShippingAddress
{
    public long? Id { get; set; } = null;

    public long CustomerId { get; set; }

    public long AddressId { get; set; }

    public string RecipientName { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public bool? IsDefault { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual Customer Customer { get; set; } = null!;
}
