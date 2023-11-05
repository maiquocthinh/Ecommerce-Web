using Backend.DTOs;
using Backend.Services;
using Backend.Services.Interfaces;
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

    [HttpGet]
    public async Task<ActionResult<object>> GetAllSupplier([FromQuery] SupplierFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var supplierQuery = await _supplierService.FilteredSupplier(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: supplierQuery, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }


    [HttpGet("{id:int}")]
    public async Task<ActionResult<object>> GetSupplier([FromRoute] int id)
    {
        var supplier = await _supplierService.GetSupplier(id);
        return Ok(RenderSuccessResponse(data: supplier));
    }


    [HttpPost]
    public async Task<ActionResult<object>> CreateSupplier([FromBody] SupplierCreateInputDto createInputDto)
    {
        var supplier = await _supplierService.CreateSupplier(createInputDto);
        return Ok(RenderSuccessResponse(data: supplier, message: "Create Supplier success."));
    }


    [HttpPatch("{id:int}")]
    public async Task<ActionResult<object>> UpdateSupplier([FromRoute] int id, [FromBody] SupplierUpdateInputDto updateInputDto)
    {
        var supplier = await _supplierService.UpdateSupplier(id, updateInputDto);
        return Ok(RenderSuccessResponse(data: supplier, message: "Update Supplier success."));
    }


    [HttpDelete("{id:int}")]
    public async Task<ActionResult<object>> DeleteCategory([FromRoute] int id)
    {
        await _supplierService.DeleteSupplier(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Supplier success."));
    }

}
