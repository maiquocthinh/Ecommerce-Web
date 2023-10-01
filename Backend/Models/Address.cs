using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Address
{
    public long Id { get; set; }

    public string SpecificAddress { get; set; } = null!;

    public string Province { get; set; } = null!;

    public string Districts { get; set; } = null!;

    public string Wards { get; set; } = null!;

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<CustomerShippingContact> CustomerShippingContacts { get; set; } = new List<CustomerShippingContact>();

    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    public virtual ICollection<Supplier> Suppliers { get; set; } = new List<Supplier>();
}
