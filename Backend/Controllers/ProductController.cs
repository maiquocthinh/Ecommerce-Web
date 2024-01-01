using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.Common.Pagging;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
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

    [AllowAnonymous]
    [HttpGet]
    [ResponseCache(Duration = 60, VaryByQueryKeys = new[] { "*" })]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagingListModel<ProductShortInfoDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListProductInClient([FromQuery] ProductFilterInputDto productFilterInputDto, [FromQuery] PagingDTO pagingDto)
    {
        var productsQueryable = await _productService.GetListProductsInClient(productFilterInputDto);

        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: productsQueryable, pageIndex: pagingDto.pageIndex,
            pageSize: pagingDto.pageSize)));
    }

    [AllowAnonymous]
    [HttpGet("{productId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<ProductDetailDto>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> ProductDetail([FromRoute] int productId) 
    {
        var res = await _productService.GetProductDetailInfo(productId);

        return Ok(RenderSuccessResponse(data: res));    
    }

    // Apis for manager

    [PermissionAuthorize(Permissions.ViewProducts)]
    [HttpGet("get")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<Product>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAllProducts([FromQuery] ProductFilterExtendInputDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var productsQueryable = await _productService.GetListProducts(filterDto);

        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: productsQueryable, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [PermissionAuthorize(Permissions.CreateProduct)]
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<Product>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CreateProduct([FromBody] ProductCreateInputDto createInputDto)
    {
        var product = await _productService.CreateProduct(createInputDto);
        return Ok(RenderSuccessResponse(data: product, message: "Create Product Success!"));
    }

    [PermissionAuthorize(Permissions.UpdateProduct)]
    [HttpPatch("update/{productId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<Product>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateProduct([FromRoute] int productId, [FromBody] ProductUpdateInputDto updateInputDto)
    {
        var product = await _productService.UpdateProduct(productId, updateInputDto);
        return Ok(RenderSuccessResponse(data: product, message: "Update product success."));
    }


    [PermissionAuthorize(Permissions.DeleteProduct)]
    [HttpDelete("delete/{productId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> DeleteProduct([FromRoute] int productId)
    {
        await _productService.DeleteProduct(productId);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete product success."));
    }

    [PermissionAuthorize(Permissions.CreateProductVersion)]
    [HttpPost("version/create")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<ProductVersion>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CreateProductVersion([FromBody] ProductVersionCreateInputDto createInputDto)
    {
        var productVersion = await _productService.CreateProductVersion(createInputDto);
        return Ok(RenderSuccessResponse(data: productVersion, message: "Create product version success."));
    }

    [PermissionAuthorize(Permissions.CreateProductVersion)]
    [HttpPatch("version/update/{productVersionId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<ProductVersion>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateProductVersion([FromRoute] int productVersionId, [FromBody] ProductVersionUpdateInputDto updateInputDto)
    {
        var productVersion = await _productService.UpdateProductVersion(productVersionId, updateInputDto);
        return Ok(RenderSuccessResponse(data: productVersion, message: "Create product version success."));
    }

    [PermissionAuthorize(Permissions.DeleteProductVersion)]
    [HttpDelete("version/delete/{productVersionId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<DiscountDTO>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> DeleteProductVersion([FromRoute] int productVersionId)
    {
        await _productService.DeleteProductVersion(productVersionId);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete product version success."));
    }
}
