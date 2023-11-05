using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IBrandRepository : IRepository<Brand>
{
    Task<IQueryable<Brand>> FilteredCategory(BrandFilterDto filterDto);
}