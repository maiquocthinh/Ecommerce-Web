using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class EmployeeRepository : SqlServerRepository<Employee>, IEmployeeRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Employee> _dbSet;

    public EmployeeRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Employee>();
    }

    public async Task<Employee?> GetByEmail(string email)
    {
        return await _dbSet.Where(c => c.Email == email).FirstOrDefaultAsync();
    }

    public async Task<Employee?> GetByPhone(string phone)
    {
        return await _dbSet.Where(c => c.PhoneNumber == phone).FirstOrDefaultAsync();
    }

    public IQueryable<Employee> GetQueryable()
    {
        return _dbSet.AsQueryable();
    }
}