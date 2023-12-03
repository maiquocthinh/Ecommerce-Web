using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.Common.Pagging;
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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<IEnumerable<OrderInfoDto>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAllOrdersOfCustomer([FromQuery] string? status = null)
    {
        var orders = await _orderService.GetAllOrderOfCustomer(status);
        return Ok(RenderSuccessResponse(data: orders));
    }

    [Authorize]
    [HttpPost("cancel/{orderId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CancelOrder([FromRoute] int orderId)
    {
        await _orderService.CancelOrderOfCustomer(orderId);
        return Ok(RenderSuccessResponseWithoutData(message: "Order canceled successfully"));
    }


    [Authorize]
    [HttpPost("{orderId:int}/change-delivery-address")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> ChangeShippingAddress([FromRoute] int orderId, [FromBody] OrderUpdateShippingInfoInputDto inputDto)
    {
        await _orderService.ChangeDeliveryAddressOfOrder(orderId, inputDto.ShippingAddressId);
        return Ok(RenderSuccessResponseWithoutData(message: "Change delivery address successfully"));
    }


    [PermissionAuthorize(Permissions.ViewOrder)]
    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<OrderInfoDto>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListOrders([FromQuery] OrderFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var orderQueryable = await _orderService.GetListOrders(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: orderQueryable, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }


    [PermissionAuthorize(Permissions.ViewOrder)]
    [HttpGet("{orderId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<OrderInfoDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetOrderInfo([FromRoute] int orderId)
    {
        var orderInfo = await _orderService.GetOrderInfo(orderId);
        return Ok(RenderSuccessResponse(data: orderInfo));
    }

    [PermissionAuthorize(Permissions.UpdateOrder)]
    [HttpPost("{orderId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateOrder([FromRoute] int orderId, [FromBody] OrderUpdateInputDto updateInputDto)
    {
        await _orderService.UpdateOrder(orderId, updateInputDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Update order success"));
    }

    [PermissionAuthorize(Permissions.UpdateOrder)]
    [HttpPost("/order-detail/{orderDetailId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateOrder([FromRoute] int orderDetailId, [FromBody] OrderDetailUpdateInputDto updateInputDto)
    {
        await _orderService.UpdateOrderDetail(orderDetailId, updateInputDto);
        return Ok(RenderSuccessResponseWithoutData(message: "Update order detail success"));
    }

}
