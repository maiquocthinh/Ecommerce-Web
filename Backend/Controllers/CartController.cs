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

    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CartDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAllCartItems()
    {
        var result = await _cartService.GetAllCartItems();

        return Ok(RenderSuccessResponse(message: "Get cart success", data: result));
    }

    [Authorize]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> AddCartItem([FromBody] CartAddDto cartAddDto)
    {
        await _cartService.CreateNewCartItem(cartAddDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Add to cart success."));
    }

    [Authorize]
    [HttpPatch("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateCartItem([FromRoute] int id,[FromBody] CartUpdateDto cartUpdateDto)
    {
        await _cartService.UpdateCartItem(id, cartUpdateDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Update cart item success."));
    }

    [Authorize]
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> DeleteCartItem([FromRoute] int id)
    {
        await _cartService.DeleteCartItem(id);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete cart item success."));
    }
}