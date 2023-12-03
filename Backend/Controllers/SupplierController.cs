using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.Common.Pagging;
using Backend.Data;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/supplier")]
public class SupplierController: BaseController
{
    private readonly ISupplierService _supplierService;

    public SupplierController(ISupplierService supplierService)
    {
        _supplierService = supplierService;
    }

    [AllowAnonymous]
    [HttpGet("all")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<SupplierTinyDto>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAllSupplier()
    {
        var allSupplier = await _supplierService.GetAllSupplier();

        return Ok(RenderSuccessResponse(data: allSupplier));
    }

    [PermissionAuthorize(Permissions.ViewSupplier)]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<SupplierDto>>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListSupplier([FromQuery] SupplierFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var supplierQueryable = await _supplierService.GetListSupplier(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: supplierQueryable, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }


    [PermissionAuthorize(Permissions.ViewSupplier)]
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<SupplierDetailDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetSupplier([FromRoute] int id)
    {
        var supplier = await _supplierService.GetSupplier(id);
        return Ok(RenderSuccessResponse(data: supplier));
    }


    [PermissionAuthorize(Permissions.CreateSupplier)]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<SupplierDetailDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CreateSupplier([FromBody] SupplierCreateInputDto createInputDto)
    {
        var supplier = await _supplierService.CreateSupplier(createInputDto);
        return Ok(RenderSuccessResponse(data: supplier, message: "Create Supplier success."));
    }


    [PermissionAuthorize(Permissions.UpdateSupplier)]
    [HttpPatch("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<SupplierDetailDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateSupplier([FromRoute] int id, [FromBody] SupplierUpdateInputDto updateInputDto)
    {
        var supplier = await _supplierService.UpdateSupplier(id, updateInputDto);
        return Ok(RenderSuccessResponse(data: supplier, message: "Update Supplier success."));
    }


    [PermissionAuthorize(Permissions.DeleteSupplier)]
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> DeleteCategory([FromRoute] int id)
    {
        await _supplierService.DeleteSupplier(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Supplier success."));
    }

}
