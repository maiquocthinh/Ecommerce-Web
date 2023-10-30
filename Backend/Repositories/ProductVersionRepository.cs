using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;

namespace Backend.Repositories;

public class ProductVersionRepository : SqlServerRepository<ProductVersion>, IProductVersionRepository
{
    public ProductVersionRepository(DBContext context) : base(context)
    {
    }
}