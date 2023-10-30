using Backend.Data;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Authorize]
[Authorize]
[Route("api/orders")]
public class OrderController : BaseController
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService) {
        _orderService = orderService;
    }

    [HttpGet("{status?}")]
    public async Task<ActionResult<SuccessResponse<IEnumerable<OrderInfoDto>>>> GetAllOrders([FromQuery] string? status = null)
    {
        var orders = await _orderService.GetAllOrderOfCustomer(status);
        return Ok(RenderSuccessResponse<IEnumerable<OrderInfoDto>>(data: orders));
    }

    [HttpPost("cancel/{orderId:int}")]
    public async Task<ActionResult<SuccessResponseWithoutData>> CancelOrder([FromRoute] int orderId)
    {
        await _orderService.CancelOrderOfCustomer(orderId);
        return Ok(RenderSuccessResponseWithoutData(message: "Order canceled successfully"));
    }
}
