using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IRoleService
{
    Task<IQueryable<RoleDto>> FilteredRole(RoleFilterDto filterDto);
    Task<RoleDto> GetRoleById(int id);
    Task<RoleDto> CreateRole(RoleCreateInputDto createInputDto);
    Task<RoleDto> UpdateRole(int id, RoleUpdateInputDto updateInputDto);
    Task<bool> DeleteRole(int id);
}