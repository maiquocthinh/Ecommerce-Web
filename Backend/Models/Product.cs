using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string ImageUrl { get; set; } = null!;

    public string Warranty { get; set; } = null!;

    public decimal ReviewsScore { get; set; }

    public bool Viewable { get; set; }

    public int CategoryId { get; set; }

    public int? NeedId { get; set; }

    public int BrandId { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    [JsonIgnore]
    public virtual Brand Brand { get; set; } = null!;

    [JsonIgnore]
    public virtual Category Category { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();

    [JsonIgnore]
    public virtual Need? Need { get; set; }
    
    [JsonIgnore]
    public virtual ICollection<ProductVersion> ProductVersions { get; set; } = new List<ProductVersion>();
}
