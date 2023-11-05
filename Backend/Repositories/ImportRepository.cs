using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class ImportRepository : SqlServerRepository<Import>, IImportRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Import> _dbSet;

    public ImportRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Import>();
    }

    public async Task<IQueryable<Import>> GetAllImport()
    {
        return _dbSet.OrderByDescending(i => i.CreatedAt).AsQueryable();
    }
}