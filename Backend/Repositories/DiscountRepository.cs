using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class DiscountRepository : SqlServerRepository<Discount>, IDiscountRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Discount> _dbSet;

    public DiscountRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Discount>();
    }

    public IQueryable<Discount> GetQueryable()
    {
        return _dbSet.AsQueryable();
    }
}