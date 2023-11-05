using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;


[ApiController]
[Route("api/categories")]
public class CategoryController: BaseController
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategory()
    {
        var categories = await _categoryService.GetAllCategory();

        return Ok(RenderSuccessResponse(data: categories));
    }

    [HttpGet] 
    public async Task<ActionResult<object>> GetFiltered([FromQuery] CategoryFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var categoryQuery = await _categoryService.FilteredCategory(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: categoryQuery, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<object>> GetCategory([FromRoute] int id)
    {
        var category = await _categoryService.GetCategory(id);
        return Ok(RenderSuccessResponse(data: category));
    }


    [HttpPost]
    public async Task<ActionResult<object>> CreateCategory([FromBody] CategoryCreateInputDto createInputDto)
    {
        var category = await _categoryService.CreateCategory(createInputDto);
        return Ok(RenderSuccessResponse(data: category, message: "Create Category success."));
    }


    [HttpPatch("{id:int}")]
    public async Task<ActionResult<object>> UpdateCategory([FromRoute] int id, [FromBody] CategoryUpdateInputDto updateInputDto)
    {
        var category = await _categoryService.UpdateCategory(id, updateInputDto);
        return Ok(RenderSuccessResponse(data: category, message: "Update Category success."));
    }


    [HttpDelete("{id:int}")]
    public async Task<ActionResult<object>> DeleteCategory([FromRoute] int id)
    {
        await _categoryService.DeleteCategory(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Category success."));
    }


}
