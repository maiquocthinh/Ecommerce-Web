using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

//Input Dto
public class BrandFilterDto
{
    public string? BrandName { get; set; }
}

public class BrandCreateInputDto
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; }
}

public class BrandUpdateInputDto
{
    public string? Name { get; set; }

    public string? Description { get; set; }
}



//Output Dto
public class BrandDto
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }
}



