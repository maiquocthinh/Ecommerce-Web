using Backend.DTOs;
using Backend.Services;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;


[ApiController]
[Route("api/needs")]
public class NeedController : BaseController
{
    private readonly INeedService _needService;

    public NeedController(INeedService needService)
    {
        _needService = needService;
    }

    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<NeedDto>>> GetAllCategory()
    {
        var needs = await _needService.GetAllNeed();

        return Ok(RenderSuccessResponse(data: needs));
    }


    [HttpGet]
    public async Task<ActionResult<object>> GetFiltered([FromQuery] NeedFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var needQuery = await _needService.FilteredNeed(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: needQuery, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<object>> GetNeed([FromRoute] int id)
    {
        var need = await _needService.GetNeed(id);
        return Ok(RenderSuccessResponse(data: need));
    }


    [HttpPost]
    public async Task<ActionResult<object>> CreateNeed([FromBody] NeedCreateInputDto createInputDto)
    {
        var need = await _needService.CreateNeed(createInputDto);
        return Ok(RenderSuccessResponse(data: need, message: "Create Need success."));
    }


    [HttpPatch("{id:int}")]
    public async Task<ActionResult<object>> UpdateNeed([FromRoute] int id, [FromBody] NeedUpdateInputDto updateInputDto)
    {
        var need = await _needService.UpdateNeed(id, updateInputDto);
        return Ok(RenderSuccessResponse(data: need, message: "Update Need success."));
    }


    [HttpDelete("{id:int}")]
    public async Task<ActionResult<object>> DeleteCategory([FromRoute] int id)
    {
        await _needService.DeleteNeed(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Need success."));
    }
}
