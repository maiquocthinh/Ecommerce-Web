using Backend.Data;
using Backend.Models;
using Backend.Respositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class CustomerRepository : SqlServerRepository<Customer>, ICustomerRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Customer> _dbSet;

    public CustomerRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Customer>();
    }

    public async Task<Customer?> GetByEmail(string email)
    {
        return await _dbSet.Where(c => c.Email == email).FirstOrDefaultAsync();
    }

    public async Task<Customer?> GetByEmailOrPhoneNumber(string? email, string? phoneNumber)
    {
        return await _dbSet.Where(c => c.Email == email || c.PhoneNumber == phoneNumber).FirstOrDefaultAsync();
    }
}