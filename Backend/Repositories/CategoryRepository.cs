using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;

namespace Backend.Repositories;

public class CategoryRepository : SqlServerRepository<Category>, ICategoryRepository
{
    public CategoryRepository(DBContext context) : base(context)
    {
    }
}