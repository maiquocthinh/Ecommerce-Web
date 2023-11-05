using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IProductVersionRepository : IRepository<ProductVersion>
{
    Task<IQueryable<ProductVersion>> GetAllProductVeersionIQueryable();
}