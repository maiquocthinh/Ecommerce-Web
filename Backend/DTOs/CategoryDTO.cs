using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

//Input Dto
public class CategoryFilterDto
{
    public string? CategoryName { get; set; }
}

public class CategoryCreateInputDto
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; }
}

public class CategoryUpdateInputDto
{
    public string? Name { get; set; }

    public string? Description { get; set; }
}

//Output Dto
public class CategoryDto
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }
}



