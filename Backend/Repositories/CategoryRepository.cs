using Backend.Data;
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

    public IQueryable<Category> GetQueryable()
    {
        return _dbSet.AsQueryable();
    }
}