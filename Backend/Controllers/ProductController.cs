using Backend.Common.Pagging;
using Backend.Data;
using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[AllowAnonymous]
[Route("api/products")]
public class ProductController : BaseController
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService) {
        _productService = productService;
    }

    [HttpGet]
    //[ResponseCache(Duration = 60, VaryByQueryKeys = new[] { "*" })]
    public async Task<ActionResult<PagingListModel<ProductShortInfoDto>>> FilterProduct([FromQuery] ProductFilterInputDto productFilterInputDto, [FromQuery] PagingDTO pagingDto)
    {
        var productsQuery = await _productService.FilterProduct(productFilterInputDto);

        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: productsQuery, pageIndex: pagingDto.pageIndex,
            pageSize: pagingDto.pageSize)));
    }

    [HttpGet("{productId:int}")]
    public async Task<ActionResult<object>> ProductDetail([FromRoute] int productId) 
    {
        var res = await _productService.GetProductDetailInfo(productId);

        return Ok(RenderSuccessResponse<object>(data: res));    
    }

}
