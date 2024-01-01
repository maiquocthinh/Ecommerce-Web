using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class NeedRepository : SqlServerRepository<Need>, INeedRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Need> _dbSet;

    public NeedRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Need>();
    }

    public IQueryable<Need> GetQueryable()
    {
        return _dbSet.AsQueryable();
    }
}