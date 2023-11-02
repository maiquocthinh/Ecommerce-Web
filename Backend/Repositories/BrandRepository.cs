using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;

namespace Backend.Repositories;

public class BrandRepository : SqlServerRepository<Brand>, IBrandRepository
{
    public BrandRepository(DBContext context) : base(context)
    {
    }
}