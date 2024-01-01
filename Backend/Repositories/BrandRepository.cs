using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class BrandRepository : SqlServerRepository<Brand>, IBrandRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Brand> _dbSet;

    public BrandRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Brand>();
    }

    public IQueryable<Brand> GetQueryable()
    {
        return _dbSet.AsQueryable();
    }
}