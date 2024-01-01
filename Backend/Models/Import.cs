using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Import
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }

    public int SupplierId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual ICollection<ImportShipment> ImportShipments { get; set; } = new List<ImportShipment>();

    public virtual Supplier Supplier { get; set; } = null!;
}
