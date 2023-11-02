using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetAllCategory();
}