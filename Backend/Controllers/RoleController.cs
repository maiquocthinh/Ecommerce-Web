using AutoMapper;
using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.Data;
using Backend.DTOs;
using Backend.Services;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace Backend.Controllers;

[ApiController]
[Route("api/roles")]
public class RoleController: BaseController
{
    private readonly IMapper _mapper;
    private readonly IRoleService _roleService;

    public RoleController(IMapper mapper, IRoleService roleService)
    {
        _mapper = mapper;
        _roleService = roleService;
    }

    [AllowAnonymous]
    [HttpGet("all-permissions")]
    public async Task<ActionResult<SuccessResponse<IEnumerable<object>>>> GetAllPermission()
    {
        var permissionType = typeof(Permissions);
        var properties = permissionType.GetFields(BindingFlags.Public | BindingFlags.Static);

        var permissionData = properties
            .Select(p => new
            {
                Name = p.Name,
                Value = p.GetValue(null)
            })
            .ToList();

        return Ok(RenderSuccessResponse(data: permissionData));
    }

    [PermissionAuthorize(Permissions.ViewRole)]
    [HttpGet]
    public async Task<ActionResult<object>> GetAllRole([FromQuery] RoleFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var roleQuery = await _roleService.FilteredRole(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: roleQuery, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }


    [PermissionAuthorize(Permissions.ViewRole)]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<object>> GetRole([FromRoute] int id)
    {
        var role = await _roleService.GetRoleById(id);
        return Ok(RenderSuccessResponse(data: role));
    }


    [PermissionAuthorize(Permissions.CreateRole)]
    [HttpPost]
    public async Task<ActionResult<object>> CreateRole([FromBody] RoleCreateInputDto createInputDto)
    {
        var role = await _roleService.CreateRole(createInputDto);
        return Ok(RenderSuccessResponse(data: role, message: "Create Role success."));
    }


    [PermissionAuthorize(Permissions.UpdateRole)]
    [HttpPatch("{id:int}")]
    public async Task<ActionResult<object>> UpdateRole([FromRoute] int id, [FromBody] RoleUpdateInputDto updateInputDto)
    {
        var role = await _roleService.UpdateRole(id, updateInputDto);
        return Ok(RenderSuccessResponse(data: role, message: "Update Role success."));
    }


    [PermissionAuthorize(Permissions.DeleteRole)]
    [HttpDelete("{id:int}")]
    public async Task<ActionResult<object>> DeleteCategory([FromRoute] int id)
    {
        await _roleService.DeleteRole(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Role success."));
    }
}
