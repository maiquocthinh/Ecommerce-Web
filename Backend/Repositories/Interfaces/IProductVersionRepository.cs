using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IProductVersionRepository : IRepository<ProductVersion>, IRepositoryQueryable<ProductVersion>
{
}