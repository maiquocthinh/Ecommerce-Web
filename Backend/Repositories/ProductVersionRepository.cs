using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class ProductVersionRepository : SqlServerRepository<ProductVersion>, IProductVersionRepository
{
    private readonly DBContext _context;
    private readonly DbSet<ProductVersion> _dbSet;

    public ProductVersionRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<ProductVersion>();
    }

    public async Task<IQueryable<ProductVersion>> GetAllProductVeersionIQueryable()
    {
        return _dbSet.OrderByDescending(pv => pv.CreatedAt).AsQueryable();
    }
}