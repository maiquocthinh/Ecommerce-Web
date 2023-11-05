using Backend.Data;
using Backend.DTOs;
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

    public Task<IQueryable<Supplier>> FilteredSupplier(SupplierFilterDto filterDto)
    {
        var query = _dbSet.OrderByDescending(s => s.CreatedAt).AsQueryable();  

        if(filterDto.Keyword != null)
        {
            query = query.Where(s => 
                s.Name.Contains(filterDto.Keyword) ||
                s.Email.Contains(filterDto.Keyword) ||
                s.PhoneNumber.Contains(filterDto.Keyword) 
            );
        }

        return Task.FromResult(query);
    }

    public async Task<Supplier> GetByEmail(string email)
    {
        return await _dbSet.Where(s => s.Email == email).FirstOrDefaultAsync();
    }

    public async Task<Supplier> GetByPhone(string phone)
    {
        return await _dbSet.Where(s => s.PhoneNumber == phone).FirstOrDefaultAsync();

    }
}