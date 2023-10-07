using Backend.Data;
using Backend.Models;
using Backend.Respositories.Interfaces;

namespace Backend.Repositories;

public class RefreshTokenRepository : SqlServerRepository<RefreshToken>, IRefreshTokenRepository
{
    private readonly DBContext _context;

    public RefreshTokenRepository(DBContext context) : base(context)
    {
        _context = context;
    }

    public async Task<RefreshToken?> GetById(Guid id)
    {
        return await _context.RefreshTokens.FindAsync(id);
    }
}