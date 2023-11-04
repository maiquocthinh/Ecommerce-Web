using Azure.Identity;
using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.DTOs;
using Backend.Models;
using Backend.Services.Interfaces;
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

    [PermissionAuthorize(Permissions.ViewEmployee)]
    [HttpGet]
    public async Task<ActionResult<object>> GetAllEmployees([FromQuery] EmployeeFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var employeeQuery = await _employeeService.FilteredEmployee(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: employeeQuery, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [PermissionAuthorize(Permissions.ViewEmployee)]
    [HttpGet("{employeeId:int}")]
    public async Task<ActionResult<object>> GetEmployeeById([FromRoute] int employeeId) {
        var employee = await _employeeService.GetEmployeeById(employeeId);
        return Ok(RenderSuccessResponse(data: employee));
    }

    [PermissionAuthorize(Permissions.CreateEmployee)]
    [HttpPost]
    public async Task<ActionResult<object>> CreateEmployee([FromBody] EmployeeCreateInputDto createInputDto)
    {
        var employee = await _employeeService.CreateEmployee(createInputDto);
        return Ok(RenderSuccessResponse(data: employee, message: "Create Employee success."));
    }

    [PermissionAuthorize(Permissions.UpdateEmployee)]
    [HttpPatch("{employeeId:int}")]
    public async Task<ActionResult<object>> UpdateEmployee([FromRoute] int employeeId, [FromBody] EmployeeUpdateInputDto updateInputDto)
    {
        var employee = await _employeeService.UpdateEmployee(employeeId, updateInputDto);
        return Ok(RenderSuccessResponse(data: employee, message: "Update Employee success."));

    }

    [PermissionAuthorize(Permissions.DeleteEmployee)]
    [HttpDelete("{employeeId:int}")]
    public async Task<ActionResult<object>> DeleteEmployee([FromRoute] int employeeId)
    {
        await _employeeService.DeleteEmpoyee(employeeId);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Employee success."));
    }
}
