using System.Security.Claims;
using Backend.Data;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("api/cart")]
public class CartController : BaseController
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public async Task<ActionResult<SuccessResponse<CartDto>>> GetAllCartItems()
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

        var result = await _cartService.GetAllCartItems(email);

        return Ok(RenderSuccessResponse<CartDto>(message: "Get cart success", data: result));
    }

    [HttpPost]
    public async Task<ActionResult<SuccessResponseWithoutData>> AddCartItem([FromBody] CartAddDto cartAddDto)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        await _cartService.CreateNewCartItem(email, cartAddDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Add to cart success."));
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<SuccessResponseWithoutData>> UpdateCartItem([FromRoute] int id,[FromBody] CartUpdateDto cartUpdateDto)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        await _cartService.UpdateCartItem(email, id, cartUpdateDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Update cart item success."));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<SuccessResponseWithoutData>> DeleteCartItem([FromRoute] int id)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        await _cartService.DeleteCartItem(email, id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete cart item success."));
    }
}