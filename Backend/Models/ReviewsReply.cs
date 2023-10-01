using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ReviewsReply
{
    public long Id { get; set; }

    public long ReviewsId { get; set; }

    public string Content { get; set; } = null!;

    public long EmployeeId { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual Review Reviews { get; set; } = null!;
}
