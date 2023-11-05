using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class BrandRepository : SqlServerRepository<Brand>, IBrandRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Brand> _dbSet;

    public BrandRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Brand>();
    }

    public async Task<IQueryable<Brand>> FilteredCategory(BrandFilterDto filterDto)
    {
        var query = _dbSet.OrderByDescending(c => c.CreatedAt).AsQueryable();

        if (filterDto.BrandName != null)
        {
            query = query.Where(b => b.Name.Contains(filterDto.BrandName));
        }

        return query;
    }
}