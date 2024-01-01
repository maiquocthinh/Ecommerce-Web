using Backend.Data;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/checkout")]
public class CheckoutController : BaseController
{
    private readonly HttpContext _httpContext;
    private readonly ICheckoutService _checkoutService;

    public CheckoutController(IHttpContextAccessor httpContextAccessor, ICheckoutService checkoutService)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _checkoutService = checkoutService;
    }

    [Authorize]
    [HttpPost("cart")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CheckoutSuccessDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CheckoutWithCartItems(
        [FromBody] CheckoutWithCartItemsInputDto checkoutInput)
    {
        var result = await _checkoutService.CheckoutWithCartItems(checkoutInput);
        return Ok(RenderSuccessResponse(data: result,
            message: "Thank you for your purchase. We will send you an order notifiacation email."));
    }

    [AllowAnonymous]
    [HttpPost("product")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CheckoutSuccessDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CheckoutWithProductAndQuantity(
        [FromBody] CheckoutInputDto checkoutInput)
    {
        var result = await _checkoutService.CheckoutWithProducts(checkoutInput);
        return Ok(RenderSuccessResponse(data: result,
            message: "Thank you for your purchase. We will send you an order notifiacation email."));
    }


    [AllowAnonymous]
    [HttpPost("product-with-authentication")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CheckoutSuccessDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CheckoutWithProductAndQuantityWithAuthen(
        [FromBody] CheckoutWithProductsInputDto checkoutInput)
    {
        var result = await _checkoutService.CheckoutWithProductsAndAuthen(checkoutInput);
        return Ok(RenderSuccessResponse(data: result,
            message: "Thank you for your purchase. We will send you an order notifiacation email."));
    }
}