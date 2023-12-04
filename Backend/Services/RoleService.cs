using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;
using Backend.Models;
using Backend.Common.Exceptions;
using Backend.Authorization;
using System.Reflection;
using System.Collections.Immutable;

namespace Backend.Services;


public class RoleService : IRoleService
{
    private readonly HttpContext _httpContext;
    private readonly IMapper _mapper;
    private readonly IRoleRepository _roleRepository;
    private readonly ImmutableList<string> _validPermissions;

    public RoleService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IRoleRepository roleRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _mapper = mapper;
        _roleRepository = roleRepository;
        _validPermissions = typeof(Permissions)
           .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
           .Where(f => f.FieldType == typeof(string))
           .Select(f => (string)f.GetValue(null))
           .ToImmutableList();
    }

    public async Task<IEnumerable<RoleTinyDto>> GetAllRole()
    {
        var allRole = await _roleRepository.GetAll();
        return allRole.Select(r => _mapper.Map<RoleTinyDto>(r));
    }

    public async Task<IQueryable<RoleDetailDto>> GetListRole(RoleFilterDto filterDto)
    {
        var query = _roleRepository.GetQueryable().OrderByDescending(r => r.CreatedAt).AsQueryable();

        if (filterDto.RoleName != null)
        {
            query = query.Where(r => r.Name.Contains(filterDto.RoleName));
        }

        return query.Select(r => _mapper.Map<RoleDetailDto>(r));
    }

    public async Task<RoleDto> GetRoleById(int id)
    {
        var role = await _roleRepository.GetById(id);
        if (role == null) throw new NotFoundException("Role not found!");
        return _mapper.Map<RoleDto>(role);
    }

    public async Task<RoleDto> CreateRole(RoleCreateInputDto createInputDto)
    {
        // validate permissions
        if (!createInputDto.Permissions.All(p => _validPermissions.Contains(p)))
            throw new BadRequestException("Invalid permision");

        var role = await _roleRepository.Add(new Role
        {
            Name = createInputDto.Name,
            PermissionList = createInputDto.Permissions.ToList(),
        });

        return _mapper.Map<RoleDto>(role);
    }

    public async Task<RoleDto> UpdateRole(int id, RoleUpdateInputDto updateInputDto)
    {
        // validate permissions
        if (!updateInputDto.Permissions.All(p => _validPermissions.Contains(p)))
            throw new BadRequestException("Invalid permision");

        var role = await _roleRepository.GetById(id);
        if (role == null) throw new NotFoundException("Role not found!");

        if (updateInputDto.Name != null) role.Name = updateInputDto.Name;
        if (updateInputDto.Permissions != null) role.PermissionList = updateInputDto.Permissions.ToList();

        await _roleRepository.Update(role);

        return _mapper.Map<RoleDto>(role);
    }

    public async Task<bool> DeleteRole(int id)
    {
        return await _roleRepository.Remove(id);
    }
}