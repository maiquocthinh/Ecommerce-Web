using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Import
{
    public long Id { get; set; }

    public long EmployeeId { get; set; }

    public long SupplierId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual ICollection<ImportBatch> ImportBatches { get; set; } = new List<ImportBatch>();

    public virtual Supplier Supplier { get; set; } = null!;
}
