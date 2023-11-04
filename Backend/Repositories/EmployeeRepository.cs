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

    public async Task<IQueryable<Employee>> FilteredEmployee(EmployeeFilterDto filterDto)
    {
        var query = _dbSet.OrderByDescending(e => e.CreatedAt).AsQueryable();

        if(filterDto.Keyword != null)
        {
            query = query.Where(e => 
                e.FirstName.Contains(filterDto.Keyword) ||
                e.LastName.Contains(filterDto.Keyword) ||
                e.Email.Contains(filterDto.Keyword) ||
                e.PhoneNumber.Contains(filterDto.Keyword)
            );
        }

        if(filterDto.RoleId != null)
        {
            query = query.Where(e => e.RoleId == filterDto.RoleId);
        }

        return query;
    }

    public async Task<Employee?> GetByEmail(string email)
    {
        return await _dbSet.Where(c => c.Email == email).FirstOrDefaultAsync();
    }

    public async Task<Employee?> GetByPhone(string phone)
    {
        return await _dbSet.Where(c => c.PhoneNumber == phone).FirstOrDefaultAsync();
    }
}