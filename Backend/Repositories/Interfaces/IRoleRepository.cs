using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IRoleRepository : IRepository<Role>, IRepositoryQueryable<Role>
{
}