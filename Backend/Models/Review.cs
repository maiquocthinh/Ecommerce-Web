using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Review
{
    public long Id { get; set; }

    public string Content { get; set; } = null!;

    public long ProductId { get; set; }

    public long ProductVersionId { get; set; }

    public long CustomerId { get; set; }

    public decimal Score { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual ProductVersion ProductVersion { get; set; } = null!;

    public virtual ICollection<ReviewsReply> ReviewsReplies { get; set; } = new List<ReviewsReply>();
}
