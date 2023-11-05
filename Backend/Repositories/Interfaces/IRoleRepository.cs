using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IRoleRepository : IRepository<Role>
{
    Task<IQueryable<Role>> FilteredRole(RoleFilterDto filterDto);
}