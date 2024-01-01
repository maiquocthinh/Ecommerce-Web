using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class ProductRepository : SqlServerRepository<Product>, IProductRepository
{

    private readonly DBContext _context;
    private readonly DbSet<Product> _dbSet;

    public ProductRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Product>();
    }

    public IQueryable<Product> GetQueryable()
    {
        return _dbSet.AsQueryable();
    }
}