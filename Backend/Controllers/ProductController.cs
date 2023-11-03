using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
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
    [ResponseCache(Duration = 60, VaryByQueryKeys = new[] { "*" })]
    public async Task<ActionResult<PagingListModel<ProductShortInfoDto>>> FilterProduct([FromQuery] ProductFilterInputDto productFilterInputDto, [FromQuery] PagingDTO pagingDto)
    {
        var productsQuery = await _productService.FilterProduct(productFilterInputDto);

        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: productsQuery, pageIndex: pagingDto.pageIndex,
            pageSize: pagingDto.pageSize)));
    }

    [HttpGet("{productId:int}")]
    public async Task<ActionResult<ProductDetailDto>> ProductDetail([FromRoute] int productId) 
    {
        var res = await _productService.GetProductDetailInfo(productId);

        return Ok(RenderSuccessResponse(data: res));    
    }

    // Apis for manager

    [PermissionAuthorize(Permissions.ViewProducts)]
    [HttpGet("get")]
    public async Task<ActionResult<object>> GetAllProducts([FromQuery] ProductFilterExtendInputDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var productsQuery = await _productService.GetListProducts(filterDto);

        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: productsQuery, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [PermissionAuthorize(Permissions.CreateProduct)]
    [HttpPost("create")]
    public async Task<ActionResult<object>> CreateProduct([FromBody] ProductCreateInputDto createInputDto)
    {
        var product = await _productService.CreateProduct(createInputDto);
        return Ok(RenderSuccessResponse(data: product, message: "Create Product Success!"));
    }

    [PermissionAuthorize(Permissions.UpdateProduct)]
    [HttpPatch("update/{productId:int}")]
    public async Task<ActionResult<object>> UpdateProduct([FromRoute] int productId, [FromBody] ProductUpdateInputDto updateInputDto)
    {
        var product = await _productService.UpdateProduct(productId, updateInputDto);
        return Ok(RenderSuccessResponse(data: product, message: "Update product success."));
    }


    [PermissionAuthorize(Permissions.DeleteProduct)]
    [HttpDelete("delete/{productId:int}")]
    public async Task<ActionResult<object>> DeleteProduct([FromRoute] int productId)
    {
        await _productService.DeleteProduct(productId);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete product success."));
    }

    [PermissionAuthorize(Permissions.CreateProductVersion)]
    [HttpPost("version/create")]
    public async Task<ActionResult<object>> CreateProductVersion([FromBody] ProductVersionCreateInputDto createInputDto)
    {
        var productVersion = await _productService.CreateProductVersion(createInputDto);
        return Ok(RenderSuccessResponse(data: productVersion, message: "Create product version success."));
    }

    [PermissionAuthorize(Permissions.CreateProductVersion)]
    [HttpPatch("version/update/{productVersionId:int}")]
    public async Task<ActionResult<object>> UpdateProductVersion([FromRoute] int productVersionId, [FromBody] ProductVersionUpdateInputDto updateInputDto)
    {
        var productVersion = await _productService.UpdateProductVersion(productVersionId, updateInputDto);
        return Ok(RenderSuccessResponse(data: productVersion, message: "Create product version success."));
    }

    [PermissionAuthorize(Permissions.DeleteProductVersion)]
    [HttpDelete("version/delete/{productVersionId:int}")]
    public async Task<ActionResult<object>> DeleteProductVersion([FromRoute] int productVersionId)
    {
        await _productService.DeleteProductVersion(productVersionId);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete product version success."));
    }
}
