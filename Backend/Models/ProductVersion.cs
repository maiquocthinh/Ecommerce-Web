using Backend.DTOs;

namespace Backend.Models;

public partial class ProductVersion
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string Name { get; set; } = null!;

    public string ImageUrl { get; set; } = null!;

    public string Color { get; set; } = null!;

    public Specifications Specifications { get; set; } = null!;

    public int Price { get; set; }

    public int Inventory { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<ImportShipment> ImportShipments { get; set; } = new List<ImportShipment>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual Product Product { get; set; } = null!;

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
