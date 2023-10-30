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
    public async Task<ActionResult<SuccessResponse<CheckoutSuccessDto>>> CheckoutWithCartItems(
        [FromBody] CheckoutWithCartItemsInputDto checkoutInput)
    {
        var result = await _checkoutService.CheckoutWithCartItems(checkoutInput);
        return Ok(RenderSuccessResponse(data: result,
            message: "Thank you for your purchase. We will send you an order notifiacation email."));
    }

    [AllowAnonymous]
    [HttpPost("product")]
    public async Task<ActionResult<SuccessResponse<CheckoutSuccessDto>>> CheckoutWithProductAndQuantity(
        [FromBody] CheckoutInputDto checkoutInput)
    {
        var result = await _checkoutService.CheckoutWithProducts(checkoutInput);
        return Ok(RenderSuccessResponse(data: result,
            message: "Thank you for your purchase. We will send you an order notifiacation email."));
    }
}