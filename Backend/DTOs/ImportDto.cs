using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace Backend.DTOs;

//Input Dto
public class InventoryFilterDto
{
    public string? Keyword { get; set; }
}

public class ImportCreateInputDto
{
    [Required(ErrorMessage = "SupplierId is required")]
    public int SupplierId { get; set; }

    [Required(ErrorMessage = "ImportShipments is required")]
    public IEnumerable<ImportShipmentInputDto> ImportShipments { get; set; }
}

public class ImportShipmentInputDto
{
    public int ProductVersionId { get; set; }

    public int Quantity { get; set; }

    public int Cost { get; set; }
}

// Output Dto
public class ImportDto
{
    public int Id { get; set; }

    public string Employee { get; set; }

    public string Supplier { get; set; }

    public int TotalAmount { get; set; }

    public DateTime CreatedAt { get; set; }
}

public class ImportShipmentDto
{
    public int Id { get; set; }

    public string ProductVersionName { get; set; }

    public int Quantity { get; set; }

    public int Remaining { get; set; }

    public int Cost { get; set; }
}

public class ImportDetailDto: ImportDto
{
    public IEnumerable<ImportShipmentDto> ImportShipments { get; set; }
}

public class InventoryDto
{
    public string ProductVersionName { get; set; }    
    public int Inventory { get; set; } 
    public string Color { get; set; }
    public bool IsOutOfStock { get; set; }
}