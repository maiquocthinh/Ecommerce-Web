using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface INeedRepository : IRepository<Need>, IRepositoryQueryable<Need>
{
}