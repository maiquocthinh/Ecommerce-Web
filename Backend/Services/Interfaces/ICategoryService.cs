using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetAllCategory();
    Task<IQueryable<CategoryDto>> GetListCategory(CategoryFilterDto filterDto);
    Task<CategoryDto> GetCategory(int id);
    Task<CategoryDto> CreateCategory(CategoryCreateInputDto createInputDto);
    Task<CategoryDto> UpdateCategory(int id, CategoryUpdateInputDto updateInputDto);
    Task<bool> DeleteCategory(int id);
}