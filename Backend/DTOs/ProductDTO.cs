using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.DTOs;

// Input Dto
public class ProductFilterInputDto
{
    public string? Keyword { get; set; }
    public ProductFilters? Filters { get; set; }
    public string? SortedBy { get; set; }
}

public class ProductFilterExtendInputDto: ProductFilterInputDto
{
    public ProductFiltersExtend? Filters { get; set; }
}

public class ProductCreateInputDto
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; }
    
    [Required(ErrorMessage = "ImageUrl is required")]
    [Url(ErrorMessage = "Invalid URL")]
    public string ImageUrl { get; set; }
    
    [Required(ErrorMessage = "Warranty is required")]
    public string Warranty { get; set; }

    [Required(ErrorMessage = "CategoryId is required")]
    public int CategoryId { get; set; }

    [Required(ErrorMessage = "BrandId is required")]
    public int BrandId { get; set; }

    public int? NeedId { get; set; }
    
    //public bool? Viewable { get; set; }
}

public class ProductUpdateInputDto
{
    public string? Name { get; set; }

    public string? Description { get; set; }

    [Url(ErrorMessage = "Invalid URL")]
    public string? ImageUrl { get; set; }

    public string? Warranty { get; set; }

    public int? CategoryId { get; set; }

    public int? BrandId { get; set; }

    public int? NeedId { get; set; }

    public bool? Viewable { get; set; }
}

public class ProductVersionCreateInputDto
{
    [Required(ErrorMessage = "ProductId is required")]
    public int ProductId { get; set; }

    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "ImageUrl is required")]
    [Url(ErrorMessage = "Invalid URL")]
    public string ImageUrl { get; set; } = null!;

    [Required(ErrorMessage = "Color is required")]
    public string Color { get; set; } = null!;

    [Required(ErrorMessage = "Specifications is required")]
    public Specifications Specifications { get; set; } = null!;

    [Required(ErrorMessage = "Price is required")]
    public int Price { get; set; }
}

public class ProductVersionUpdateInputDto
{
    public string? Name { get; set; } = null!;

    [Url(ErrorMessage = "Invalid URL")]
    public string? ImageUrl { get; set; } = null!;

    public string? Color { get; set; } = null!;

    public Specifications? Specifications { get; set; } = null!;

    public int? Price { get; set; }
}

// Output Dto
public class ProductShortInfoDto
{
    public int Id { get; set; }
    public string ImageUrl { get; set; }
    public string Name { get; set; }
    public int Price { get; set; }
    public int OriginPrice { get; set; }
    public short DiscountPercent { get; set; }
    public decimal ReviewsScore { get; set; }
    public bool IsOutOfStock { get; set; }
    public ProductCatalogs Catalogs { get; set; }
}

public class ProductDetailDto
{
    public int Id { get; set;}
    public string ImageUrl { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal ReviewsScore { get; set; }
    public string Warranty { get; set; }
    public IEnumerable<ProductVersionDetail> ProductVersions { get; set; }
    public ProductCatalogs Catalogs { get; set; }
}

// Subclass
public class ProductFilters
{
    public int? CategoryId { get; set; }
    public int? BrandId { get; set; }
    public int? NeedId { get; set; }
    public PriceRange? PriceRange { get; set; }
    public bool IsOutOfStock { get; set; }
}


public class ProductFiltersExtend: ProductFilters
{
    public bool? Viewable { get; set; }
    public bool? OutOfStock { get; set; }
}

public class PriceRange
{
    public int MinPrice { get; set; }
    public int MaxPrice { get; set; }
}

public class ProductVersionDetail
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string ImageUrl { get; set; }

    public string Color { get; set; }

    public Specifications Specifications { get; set; }

    public int OriginPrice { get; set; }

    public int Price { get; set; }

    public bool IsOutOfStock { get; set; }
}

public class ProductCatalogs
{
    public int CategoryId { get; set; }
    public int? NeedId { get; set; }
    public int BrandId { get; set; }
}

// Other

public class Specifications : ISpecificationsOfLaptop, ISpecificationsOfSmartPhone
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? OS { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CPU { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? GPU { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? RAM { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Storage { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Display { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Webcam { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ConnectivityPorts { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? WirelessConnectivity { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Weight { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Battery { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? ReleaseYear { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? RearCamera { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FrontCamera { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? BatteryCapacity { get; set; }
}

public class SpecificationsOfLaptop : ISpecificationsOfLaptop
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? OS { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CPU { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? GPU { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? RAM { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Storage { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Display { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Webcam { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ConnectivityPorts { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? WirelessConnectivity { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Weight { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Battery { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? ReleaseYear { get; set; }
}


public class SpecificationsOfSmartPhone : ISpecificationsOfSmartPhone
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? OS { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CPU { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? RAM { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Storage { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Display { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? RearCamera { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FrontCamera { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ConnectivityPorts { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? WirelessConnectivity { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Weight { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? BatteryCapacity { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? ReleaseYear { get; set; }
}

public interface ISpecificationsOfLaptop
{
    public string? OS { get; set; }
    public string? CPU { get; set; }
    public string? GPU { get; set; }
    public string? RAM { get; set; }
    public string? Storage { get; set; }
    public string? Display { get; set; }
    public string? Webcam { get; set; }
    public string? ConnectivityPorts { get; set; }
    public string? WirelessConnectivity { get; set; }
    public string? Weight { get; set; }
    public string? Battery { get; set; }
    public int? ReleaseYear { get; set; }
}

public interface ISpecificationsOfSmartPhone
{
    public string? OS { get; set; }
    public string? CPU { get; set; }
    public string? RAM { get; set; }
    public string? Storage { get; set; }
    public string? Display { get; set; }
    public string? RearCamera { get; set; }
    public string? FrontCamera { get; set; }
    public string? ConnectivityPorts { get; set; }
    public string? WirelessConnectivity { get; set; }
    public string? Weight { get; set; }
    public string? BatteryCapacity { get; set; }
    public int? ReleaseYear { get; set; }
}
