using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;
using Backend.Models;
using Backend.Common.Exceptions;
using Backend.Authorization.PolicyProvider;
using Backend.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services;


public class RoleService : IRoleService
{
    private readonly HttpContext _httpContext;
    private readonly IMapper _mapper;
    private readonly IRoleRepository _roleRepository;

    public RoleService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IRoleRepository roleRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _mapper = mapper;
        _roleRepository = roleRepository;
    }

    public async Task<IQueryable<RoleDto>> FilteredRole(RoleFilterDto filterDto)
    {
        return (await _roleRepository.FilteredRole(filterDto)).Select(r => _mapper.Map<RoleDto>(r));    
    }

    public async Task<RoleDto> GetRoleById(int id)
    {
        var role  = await _roleRepository.GetById(id);
        if (role == null) throw new NotFoundException("Role not found!");
        return _mapper.Map<RoleDto>(role);
    }

    public async Task<RoleDto> CreateRole(RoleCreateInputDto createInputDto)
    {
        var role = await _roleRepository.Add(new Role
        {
            Name = createInputDto.Name,
            PermissionList = createInputDto.Permissions.ToList(),
        });

        return _mapper.Map<RoleDto>(role);
    }

    public async Task<RoleDto> UpdateRole(int id, RoleUpdateInputDto updateInputDto)
    {
        var role = await _roleRepository.GetById(id);
        if (role == null) throw new NotFoundException("Role not found!");

        if(updateInputDto.Name != null) role.Name = updateInputDto.Name;   
        if(updateInputDto.Permissions != null) role.PermissionList= updateInputDto.Permissions.ToList();

        await _roleRepository.Update(role);

        return _mapper.Map<RoleDto>(role);
    }

    public async Task<bool> DeleteRole(int id)
    {
        return await _roleRepository.Remove(id);    
    }

}