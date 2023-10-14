using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class RefreshTokenRepository : SqlServerRepository<RefreshToken>, IRefreshTokenRepository
{
    private readonly DBContext _context;
    private readonly DbSet<RefreshToken> _dbSet;

    public RefreshTokenRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<RefreshToken>();
    }

    public async Task<RefreshToken?> GetById(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<RefreshToken?> GetByEmployeeId(long employeeId)
    {
        return await _dbSet.Where(rt => rt.EmployeeId == employeeId).FirstOrDefaultAsync();
    }
}