using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ImportBatch
{
    public long Id { get; set; }

    public long ImportId { get; set; }

    public long ProductVersionId { get; set; }

    public int Quantity { get; set; }

    public int Remaining { get; set; }

    public int Cost { get; set; }

    public virtual Import Import { get; set; } = null!;

    public virtual ProductVersion ProductVersion { get; set; } = null!;
}
