using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services;
using Google.Apis.Gmail.v1.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;

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

    public async Task<IQueryable<Product>> GetFilteredProducts(ProductFilterInputDto productFilterInputDto)
    {
        var query = _dbSet.Where(p => p.Viewable == true)
            .Where(p => p.ProductVersions.Count > 0).AsQueryable();

        if (!string.IsNullOrEmpty(productFilterInputDto.Keyword))
        {
            query = query.Where(p => p.Name.Contains(productFilterInputDto.Keyword));
        }

        if (productFilterInputDto.Filters != null)
        {
            if (productFilterInputDto.Filters.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == productFilterInputDto.Filters.CategoryId);
            }

            if (productFilterInputDto.Filters.BrandId.HasValue)
            {
                query = query.Where(p => p.BrandId == productFilterInputDto.Filters.BrandId);
            }

            if (productFilterInputDto.Filters.NeedId.HasValue)
            {
                query = query.Where(p => p.NeedId == productFilterInputDto.Filters.NeedId);
            }

            if (productFilterInputDto.Filters.PriceRange != null)
            {
                query = query.Where(p => p.ProductVersions.Any(pv =>
                    pv.Price >= productFilterInputDto.Filters.PriceRange.MinPrice &&
                    pv.Price <= productFilterInputDto.Filters.PriceRange.MaxPrice)
                );
            }
        }

        if (productFilterInputDto.SortedBy != null)
        {
            switch (productFilterInputDto.SortedBy)
            {
                case ProductSortedBy.PriceAsc:
                    query = query.Select(p => new
                    {
                        Product = p,
                        MinPrice = p.ProductVersions.Min(pv => (int?)pv.Price)
                    })
                        .OrderBy(p => p.MinPrice)
                        .Select(p => p.Product);
                    break;
                case ProductSortedBy.PriceDesc:
                    query = query.Select(p => new
                    {
                        Product = p,
                        MinPrice = p.ProductVersions.Min(pv => (int?)pv.Price)
                    })
                        .OrderByDescending(p => p.MinPrice)
                        .Select(p => p.Product);
                    break;
                case ProductSortedBy.New:
                    query = query.Select(p => new
                    {
                        Product = p,
                        MaxReleaseYear = p.ProductVersions.Max(pv => (int?)pv.Specifications.ReleaseYear)
                    })
                        .OrderByDescending(p => p.MaxReleaseYear)
                        .Select(p => p.Product);
                    break;
            }
        }
        else
        {
            query = query.OrderBy(p => p.CreatedAt);
        }

        return query;
    }
}