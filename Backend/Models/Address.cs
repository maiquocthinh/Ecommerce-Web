﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class Address
{
    [JsonIgnore]
    public int Id { get; set; }

    public string SpecificAddress { get; set; } = null!;

    public string Province { get; set; } = null!;

    public string Districts { get; set; } = null!;

    public string Wards { get; set; } = null!;

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    [JsonIgnore]
    public virtual ICollection<ShippingAddress> ShippingAddresses { get; set; } = new List<ShippingAddress>();

    [JsonIgnore]
    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    [JsonIgnore]
    public virtual ICollection<Supplier> Suppliers { get; set; } = new List<Supplier>();
}
