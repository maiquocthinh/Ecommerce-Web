using Azure.Identity;
using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.Common.Pagging;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;


[ApiController]
[Route("api/employees")]
public class EmployeeController : BaseController
{
    private readonly IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [Authorize]
    [HttpGet("profile")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<EmployeeDetailDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetEmployeeProfile()
    {
        var employee = await _employeeService.GetEmployeeProfile();
        return Ok(RenderSuccessResponse(data: employee));
    }


    [Authorize]
    [HttpPatch("profile")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<EmployeeDetailDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateEmployeeProfile([FromBody] EmployeeUpdateInputDto updateInputDto)
    {
        var employee = await _employeeService.UpdateEmployeeProfile(updateInputDto);
        return Ok(RenderSuccessResponse(data: employee));
    }


    [PermissionAuthorize(Permissions.ViewEmployee)]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<EmployeeShortDto>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListEmployees([FromQuery] EmployeeFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var employeeQueryable = await _employeeService.GetListEmployee(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: employeeQueryable, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [PermissionAuthorize(Permissions.ViewEmployee)]
    [HttpGet("{employeeId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<EmployeeDetailDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetEmployeeById([FromRoute] int employeeId)
    {
        var employee = await _employeeService.GetEmployeeById(employeeId);
        return Ok(RenderSuccessResponse(data: employee));
    }

    [PermissionAuthorize(Permissions.CreateEmployee)]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<EmployeeDetailDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CreateEmployee([FromBody] EmployeeCreateInputDto createInputDto)
    {
        var employee = await _employeeService.CreateEmployee(createInputDto);
        return Ok(RenderSuccessResponse(data: employee, message: "Create Employee success."));
    }

    [PermissionAuthorize(Permissions.UpdateEmployee)]
    [HttpPatch("{employeeId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<EmployeeDetailDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateEmployee([FromRoute] int employeeId, [FromBody] EmployeeUpdateInputDto updateInputDto)
    {
        var employee = await _employeeService.UpdateEmployee(employeeId, updateInputDto);
        return Ok(RenderSuccessResponse(data: employee, message: "Update Employee success."));

    }

    [PermissionAuthorize(Permissions.DeleteEmployee)]
    [HttpDelete("{employeeId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> DeleteEmployee([FromRoute] int employeeId)
    {
        await _employeeService.DeleteEmpoyee(employeeId);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Employee success."));
    }
}
