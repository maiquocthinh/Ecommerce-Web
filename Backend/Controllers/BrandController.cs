using Backend.DTOs;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BrandDto>>> GetAllCategory()
    {
        var brands = await _brandService.GetAllBrand();

        return Ok(RenderSuccessResponse(data: brands));
    }

}
