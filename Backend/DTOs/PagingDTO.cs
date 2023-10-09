using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class PagingDTO
{
    [Required]
    [Range(minimum: 1, maximum: int.MaxValue)]
    public int pageIndex { get; set; }
    
    [Required]
    [Range(minimum: 1, maximum: int.MaxValue)]
    public int pageSize { get; set; }
}