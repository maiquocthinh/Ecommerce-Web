using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Interfaces;

public interface IProductRepository : IRepository<Product>
{
    Task<IQueryable<Product>> GetFilteredProducts(ProductFilterInputDto productFilterInputDto);
    Task<IQueryable<Product>> FilteredProducts(ProductFilterExtendInputDto filter);
}