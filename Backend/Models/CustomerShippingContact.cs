using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class CustomerShippingContact
{
    public long Id { get; set; }

    public long CustomerId { get; set; }

    public string Fullname { get; set; } = null!;

    public long AddressId { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public virtual Address Address { get; set; } = null!;

    public virtual Customer Customer { get; set; } = null!;
}
