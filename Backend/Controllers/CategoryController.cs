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
[Route("api/categories")]
public class CategoryController : BaseController
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet("all")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<IEnumerable<CategoryDto>>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAllCategory()
    {
        var categories = await _categoryService.GetAllCategory();

        return Ok(RenderSuccessResponse(data: categories));
    }

    [HttpGet]
    [PermissionAuthorize(Permissions.ViewCategory)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<CategoryDto>>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListCategory([FromQuery] CategoryFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var categoryQueryable = await _categoryService.GetListCategory(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: categoryQueryable, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [HttpGet("{id:int}")]
    [PermissionAuthorize(Permissions.ViewCategory)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CategoryDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetCategory([FromRoute] int id)
    {
        var category = await _categoryService.GetCategory(id);
        return Ok(RenderSuccessResponse(data: category));
    }


    [HttpPost]
    [PermissionAuthorize(Permissions.CreateCategory)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CategoryDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryCreateInputDto createInputDto)
    {
        var category = await _categoryService.CreateCategory(createInputDto);
        return Ok(RenderSuccessResponse(data: category, message: "Create Category success."));
    }


    [HttpPatch("{id:int}")]
    [PermissionAuthorize(Permissions.UpdateCategory)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CategoryDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateCategory([FromRoute] int id, [FromBody] CategoryUpdateInputDto updateInputDto)
    {
        var category = await _categoryService.UpdateCategory(id, updateInputDto);
        return Ok(RenderSuccessResponse(data: category, message: "Update Category success."));
    }


    [HttpDelete("{id:int}")]
    [PermissionAuthorize(Permissions.DeleteCategory)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<ActionResult<object>> DeleteCategory([FromRoute] int id)
    {
        await _categoryService.DeleteCategory(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Category success."));
    }


}
