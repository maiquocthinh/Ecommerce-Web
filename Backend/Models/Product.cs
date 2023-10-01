using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Product
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Detail { get; set; } = null!;

    public string? Images { get; set; }

    public string Warranty { get; set; } = null!;

    public decimal DiscountPercent { get; set; }

    public bool? DiscountActive { get; set; }

    public decimal ReviewsScore { get; set; }

    public long CategoryId { get; set; }

    public long NeedId { get; set; }

    public long BrandId { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;

    public virtual Need Need { get; set; } = null!;

    public virtual ICollection<ProductVersion> ProductVersions { get; set; } = new List<ProductVersion>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
