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
[Route("api/brands")]
public class BrandController : BaseController
{
    private readonly IBrandService _brandService;

    public BrandController(IBrandService brandService)
    {
        _brandService = brandService;
    }

    [AllowAnonymous]
    [HttpGet("all")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<IEnumerable<BrandDto>>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAllCategory()
    {
        var brands = await _brandService.GetAllBrand();

        return Ok(RenderSuccessResponse(data: brands));
    }

    [HttpGet]
    [PermissionAuthorize(Permissions.ViewBrand)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<BrandDto>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListBrand([FromQuery] BrandFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var brandQuery = await _brandService.GetListBrand(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: brandQuery, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [HttpGet("{id:int}")]
    [PermissionAuthorize(Permissions.ViewBrand)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<BrandDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetBrand([FromRoute] int id)
    {
        var brand = await _brandService.GetBrand(id);
        return Ok(RenderSuccessResponse(data: brand));
    }


    [HttpPost]
    [PermissionAuthorize(Permissions.CreateBrand)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<BrandDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CreateBrand([FromBody] BrandCreateInputDto createInputDto)
    {
        var brand = await _brandService.CreateBrand(createInputDto);
        return Ok(RenderSuccessResponse(data: brand, message: "Create Brand success."));
    }


    [HttpPatch("{id:int}")]
    [PermissionAuthorize(Permissions.UpdateBrand)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<BrandDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<ActionResult<SuccessResponse<BrandDto>>> UpdateBrand([FromRoute] int id, [FromBody] BrandUpdateInputDto updateInputDto)
    {
        var brand = await _brandService.UpdateBrand(id, updateInputDto);
        return Ok(RenderSuccessResponse(data: brand, message: "Update Brand success."));
    }


    [HttpDelete("{id:int}")]
    [PermissionAuthorize(Permissions.DeleteBrand)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> DeleteBrand([FromRoute] int id)
    {
        await _brandService.DeleteBrand(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Brand success."));
    }

}
