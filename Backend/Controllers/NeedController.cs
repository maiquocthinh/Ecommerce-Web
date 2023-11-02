using Backend.DTOs;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NeedDto>>> GetAllCategory()
    {
        var needs = await _needService.GetAllNeed();

        return Ok(RenderSuccessResponse(data: needs));
    }

}
