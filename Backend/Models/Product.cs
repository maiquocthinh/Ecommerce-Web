using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Warranty { get; set; } = null!;

    public decimal ReviewsScore { get; set; }

    public bool Viewable { get; set; }

    public int CategoryId { get; set; }

    public int? NeedId { get; set; }

    public int BrandId { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();

    public virtual Need? Need { get; set; }
    
    public virtual ICollection<ProductVersion> ProductVersions { get; set; } = new List<ProductVersion>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
