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

    public async Task<IQueryable<Need>> FilteredNeed(NeedFilterDto filterDto)
    {
        var query = _dbSet.OrderByDescending(c => c.CreatedAt).AsQueryable();

        if (filterDto.NeedTitle != null)
        {
            query = query.Where(n => n.Title.Contains(filterDto.NeedTitle));
        }

        return query;
    }
}