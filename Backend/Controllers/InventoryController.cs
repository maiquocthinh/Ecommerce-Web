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
[Route("api/inventory")]
public class InventoryController : BaseController
{
    private readonly IInventoryService _inventoryService;

    public InventoryController(IInventoryService inventoryService)
    {
        _inventoryService = inventoryService;
    }

    [PermissionAuthorize(Permissions.ViewInventory)]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<InventoryDto>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListInventory([FromQuery] InventoryFilterDto filterDto,[FromQuery] PagingDTO pagingDto)
    {
        var inventoryQueryable = await _inventoryService.GetListInventory(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: inventoryQueryable, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [AllowAnonymous]
    [HttpGet("import-shipment/{productVersionId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<IEnumerable<ImportShipmentDto>>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAllImportShipmentOfProductVersion([FromRoute] int productVersionId)
    {
        var importShipments = await _inventoryService.GetAllImportShipmentOfProductVersion(productVersionId);
        return Ok(RenderSuccessResponse(data: importShipments));
    }

    [PermissionAuthorize(Permissions.ViewImport)]
    [HttpGet("imports")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<ImportDto>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListImport([FromQuery] PagingDTO pagingDto)
    {
        var importQueryable = await _inventoryService.GetListImport();
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: importQueryable, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [PermissionAuthorize(Permissions.ViewImport)]
    [HttpGet("imports/{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<ImportDetailDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetImportDetail([FromRoute] int id)
    {
        var import = await _inventoryService.GetImportDetail(id);
        return Ok(RenderSuccessResponse(data:import));
    }

    [PermissionAuthorize(Permissions.CreateImport)]
    [HttpPost("imports")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CreateImport([FromBody] ImportCreateInputDto createInputDto) 
    {
        await _inventoryService.CreateImport(createInputDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Create New Import success."));
    }
}
