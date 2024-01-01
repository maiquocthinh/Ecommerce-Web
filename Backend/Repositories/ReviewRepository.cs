using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class ReviewRepository : SqlServerRepository<Review>, IReviewRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Review> _dbSet;

    public ReviewRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Review>();
    }

    public async Task<Review> GetByCustomerIdAndProductVersionId(int customerId, int productVersionId)
    {
        return await _dbSet.Where(r => r.CustomerId == customerId &&  r.ProductVersionId == productVersionId).FirstOrDefaultAsync();
    }

    public IQueryable<Review> GetQueryable()
    {
        return _dbSet.AsQueryable();
    }
}