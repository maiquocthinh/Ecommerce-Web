using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class SupplierRepository : SqlServerRepository<Supplier>, ISupplierRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Supplier> _dbSet;

    public SupplierRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Supplier>();
    }

    public async Task<Supplier> GetByEmail(string email)
    {
        return await _dbSet.Where(s => s.Email == email).FirstOrDefaultAsync();
    }

    public async Task<Supplier> GetByPhone(string phone)
    {
        return await _dbSet.Where(s => s.PhoneNumber == phone).FirstOrDefaultAsync();

    }

    IQueryable<Supplier> IRepositoryQueryable<Supplier>.GetQueryable()
    {
        return _dbSet.AsQueryable();
    }
}