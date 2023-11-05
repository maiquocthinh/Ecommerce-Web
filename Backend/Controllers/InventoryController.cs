using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.DTOs;
using Backend.Services.Interfaces;
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
    public async Task<ActionResult<object>> GetAllInverntory([FromQuery] InventoryFilterDto filterDto,[FromQuery] PagingDTO pagingDto)
    {
        var query = await _inventoryService.GetAllInventory(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: query, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [HttpGet("import-shipment/{productVersionId:int}")]
    public async Task<ActionResult<object>> GetAllImport([FromRoute] int productVersionId)
    {
        var importShipments = await _inventoryService.GetAllImportShipmentOfProductVersion(productVersionId);
        return Ok(RenderSuccessResponse(data: importShipments));
    }

    [PermissionAuthorize(Permissions.ViewImport)]
    [HttpGet("imports")]
    public async Task<ActionResult<object>> GetAllImport([FromQuery] PagingDTO pagingDto)
    {
        var query = await _inventoryService.GetAllImport();
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: query, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [PermissionAuthorize(Permissions.ViewImport)]
    [HttpGet("imports/{id:int}")]
    public async Task<ActionResult<object>> GetImportDetail([FromRoute] int id)
    {
        var import = await _inventoryService.GetImportDetail(id);
        return Ok(RenderSuccessResponse(data:import));
    }

    [PermissionAuthorize(Permissions.CreateImport)]
    [HttpPost("imports")]
    public async Task<ActionResult<object>> CreateImport([FromBody] ImportCreateInputDto createInputDto) 
    {
        await _inventoryService.CreateImport(createInputDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Create New Import success."));
    }
}
