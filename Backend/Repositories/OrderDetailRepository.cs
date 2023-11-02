using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class OrderDetailRepository : SqlServerRepository<OrderDetail>, IOrderDetailRepository
{
    private readonly DBContext _context;
    private readonly DbSet<OrderDetail> _dbSet;

    public OrderDetailRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<OrderDetail>();
    }

    public async Task<OrderDetail> GetByCutomerIdAndProductVersionId(int customerId, int productVersionId)
    {
        return await _dbSet.Where(od => od.ProductVersionId == productVersionId && od.Order.CustomerId == customerId).FirstOrDefaultAsync();
    }
}