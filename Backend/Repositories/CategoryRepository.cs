using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class CategoryRepository : SqlServerRepository<Category>, ICategoryRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Category> _dbSet;

    public CategoryRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Category>();
    }

    public async Task<IQueryable<Category>> FilteredCategory(CategoryFilterDto filterDto)
    {
        var query = _dbSet.OrderByDescending(c => c.CreatedAt).AsQueryable();

        if(filterDto.CategoryName != null)
        {
            query = query.Where(c => c.Name.Contains(filterDto.CategoryName));
        }

        return query;
    }
}