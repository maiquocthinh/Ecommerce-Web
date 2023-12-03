using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class RoleRepository : SqlServerRepository<Role>, IRoleRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Role> _dbSet;

    public RoleRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Role>();
    }

    public IQueryable<Role> GetQueryable()
    {
        return _dbSet.AsQueryable();
    }
}