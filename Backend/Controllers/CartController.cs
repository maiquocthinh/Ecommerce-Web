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
        var result = await _cartService.GetAllCartItems();

        return Ok(RenderSuccessResponse<CartDto>(message: "Get cart success", data: result));
    }

    [HttpPost]
    public async Task<ActionResult<SuccessResponseWithoutData>> AddCartItem([FromBody] CartAddDto cartAddDto)
    {
        await _cartService.CreateNewCartItem(cartAddDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Add to cart success."));
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<SuccessResponseWithoutData>> UpdateCartItem([FromRoute] int id,[FromBody] CartUpdateDto cartUpdateDto)
    {
        await _cartService.UpdateCartItem(id, cartUpdateDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Update cart item success."));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<SuccessResponseWithoutData>> DeleteCartItem([FromRoute] int id)
    {
        await _cartService.DeleteCartItem(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete cart item success."));
    }
}