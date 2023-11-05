using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

//Input Dto
public class NeedFilterDto
{
    public string? NeedTitle { get; set; }
}

public class NeedCreateInputDto
{
    [Required(ErrorMessage = "Title is required")]
    public string Title { get; set; }

    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; }
}

public class NeedUpdateInputDto
{
    public string? Title { get; set; }

    public string? Description { get; set; }
}

//Output Dto
public class NeedDto
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }
}



