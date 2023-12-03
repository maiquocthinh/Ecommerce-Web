using AutoMapper;
using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.Common.Pagging;
using Backend.Data;
using Backend.DTOs;
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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<IEnumerable<object>>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAllPermission()
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


    [AllowAnonymous]
    [HttpGet("all")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<IEnumerable<RoleTinyDto>>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAllRole()
    {
        var allRole = await _roleService.GetAllRole();

        return Ok(RenderSuccessResponse(data: allRole));
    }

    [PermissionAuthorize(Permissions.ViewRole)]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<RoleDto>>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListRole([FromQuery] RoleFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var roleQueryable = await _roleService.GetListRole(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: roleQueryable, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }


    [PermissionAuthorize(Permissions.ViewRole)]
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<RoleDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetRole([FromRoute] int id)
    {
        var role = await _roleService.GetRoleById(id);
        return Ok(RenderSuccessResponse(data: role));
    }


    [PermissionAuthorize(Permissions.CreateRole)]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<RoleDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CreateRole([FromBody] RoleCreateInputDto createInputDto)
    {
        var role = await _roleService.CreateRole(createInputDto);
        return Ok(RenderSuccessResponse(data: role, message: "Create Role success."));
    }


    [PermissionAuthorize(Permissions.UpdateRole)]
    [HttpPatch("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<RoleDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateRole([FromRoute] int id, [FromBody] RoleUpdateInputDto updateInputDto)
    {
        var role = await _roleService.UpdateRole(id, updateInputDto);
        return Ok(RenderSuccessResponse(data: role, message: "Update Role success."));
    }


    [PermissionAuthorize(Permissions.DeleteRole)]
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> DeleteCategory([FromRoute] int id)
    {
        await _roleService.DeleteRole(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Role success."));
    }
}
