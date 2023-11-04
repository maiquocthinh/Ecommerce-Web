using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend.Repositories;

public class DiscountRepository : SqlServerRepository<Discount>, IDiscountRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Discount> _dbSet;

    public DiscountRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Discount>();
    }

    public async Task<IQueryable<Discount>> GetFilterdDiscount(DiscountFilterDto filterDto)
    {
        var query = _dbSet.OrderByDescending(d => d.Id).AsQueryable();

        if (filterDto.ProductName != null)
        {
            query = query.Where(d => d.Product.Name.Contains(filterDto.ProductName));
        }

        if (filterDto.Active != null)
        {
            query = query.Where(d => d.Active == filterDto.Active);
        }

        if (filterDto.Expired != null)
        {
            query = query.Where(d => d.EndDate < DateTime.Now);
        }

        return query;
    }

}