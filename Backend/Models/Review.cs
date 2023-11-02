using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Review
{
    public int Id { get; set; }

    public string Content { get; set; } = null!;

    public int ProductVersionId { get; set; }

    public int CustomerId { get; set; }

    public byte Score { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual ProductVersion ProductVersion { get; set; } = null!;

    public virtual ICollection<ReviewsReply> ReviewsReplies { get; set; } = new List<ReviewsReply>();
}
