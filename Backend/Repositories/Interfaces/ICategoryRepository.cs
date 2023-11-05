using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface ICategoryRepository : IRepository<Category>
{
    Task<IQueryable<Category>> FilteredCategory(CategoryFilterDto filterDto);
}