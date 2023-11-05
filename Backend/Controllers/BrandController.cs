using Backend.DTOs;
using Backend.Services;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;


[ApiController]
[Route("api/brands")]
public class BrandController : BaseController
{
    private readonly IBrandService _brandService;

    public BrandController(IBrandService brandService)
    {
        _brandService = brandService;
    }

    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<BrandDto>>> GetAllCategory()
    {
        var brands = await _brandService.GetAllBrand();

        return Ok(RenderSuccessResponse(data: brands));
    }

    [HttpGet]
    public async Task<ActionResult<object>> GetFiltered([FromQuery] BrandFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var brandQuery = await _brandService.FilteredBrand(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: brandQuery, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<object>> GetBrand([FromRoute] int id)
    {
        var brand = await _brandService.GetBrand(id);
        return Ok(RenderSuccessResponse(data: brand));
    }


    [HttpPost]
    public async Task<ActionResult<object>> CreateBrand([FromBody] BrandCreateInputDto createInputDto)
    {
        var brand = await _brandService.CreateBrand(createInputDto);
        return Ok(RenderSuccessResponse(data: brand, message: "Create Brand success."));
    }


    [HttpPatch("{id:int}")]
    public async Task<ActionResult<object>> UpdateBrand([FromRoute] int id, [FromBody] BrandUpdateInputDto updateInputDto)
    {
        var brand = await _brandService.UpdateBrand(id, updateInputDto);
        return Ok(RenderSuccessResponse(data: brand, message: "Update Brand success."));
    }


    [HttpDelete("{id:int}")]
    public async Task<ActionResult<object>> DeleteBrand([FromRoute] int id)
    {
        await _brandService.DeleteBrand(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Brand success."));
    }

}
