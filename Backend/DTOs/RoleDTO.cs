using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

//Input Dto
public class RoleFilterDto
{
    public string? RoleName { get; set; }
}

public class RoleCreateInputDto
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Permissions is required")]
    public IEnumerable<string> Permissions { get; set; }
}

public class RoleUpdateInputDto
{
    public string? Name { get; set; } = null!;

    public IEnumerable<string>? Permissions { get; set; }
}

//Output Dto

public class RoleTinyDto
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
}

public class RoleDto: RoleTinyDto
{
    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }
}

public class RoleDetailDto : RoleDto
{
    public IEnumerable<string> Permissions { get; set; }
}
