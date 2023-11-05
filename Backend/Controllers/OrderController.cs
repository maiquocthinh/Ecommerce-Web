using Backend.Data;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/orders")]
public class OrderController : BaseController
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [Authorize]
    [HttpGet("{status?}")]
    public async Task<ActionResult<SuccessResponse<IEnumerable<OrderInfoDto>>>> GetAllOrdersOfCustomer([FromQuery] string? status = null)
    {
        var orders = await _orderService.GetAllOrderOfCustomer(status);
        return Ok(RenderSuccessResponse<IEnumerable<OrderInfoDto>>(data: orders));
    }

    [Authorize]
    [HttpPost("cancel/{orderId:int}")]
    public async Task<ActionResult<SuccessResponseWithoutData>> CancelOrder([FromRoute] int orderId)
    {
        await _orderService.CancelOrderOfCustomer(orderId);
        return Ok(RenderSuccessResponseWithoutData(message: "Order canceled successfully"));
    }


    [HttpGet("list")]
    public async Task<ActionResult<object>> GetListOrders([FromQuery] OrderFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var orderQuery = await _orderService.ListFilteredOrders(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: orderQuery, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }


    [HttpGet("{orderId:int}")]
    public async Task<ActionResult<object>> GetOrderInfo([FromRoute] int orderId)
    {
        var orderInfo = await _orderService.GetOrderInfo(orderId);
        return Ok(RenderSuccessResponse(data: orderInfo));
    }

    [HttpPost("{orderId:int}")]
    public async Task<ActionResult<object>> UpdateOrder([FromRoute] int orderId, [FromBody] OrderUpdateInputDto updateInputDto)
    {
        await _orderService.UpdateOrder(orderId, updateInputDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Update order success"));
    }

    [HttpPost("/order-detail/{orderDetailId:int}")]
    public async Task<ActionResult<object>> UpdateOrder([FromRoute] int orderDetailId, [FromBody] OrderDetailUpdateInputDto updateInputDto)
    {
        await _orderService.UpdateOrderDetail(orderDetailId, updateInputDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Update order detail success"));
    }

}
