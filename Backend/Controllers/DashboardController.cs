using Backend.Data;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController: BaseController
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("parameters")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetParameters()
    {
        var data = await _dashboardService.GetParameters();
        return Ok(RenderSuccessResponse(data: data));
    }


    [HttpGet("table/best-selling-products")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetBestSellingProducts([FromQuery] DashboardFilterDto filterDto)
    {
        var data = await _dashboardService.GetBestSellProducts_Table(filterDto);
        return Ok(RenderSuccessResponse(data: data));
    }

    [HttpGet("table/top-selling-employees")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetTopSellingEmployyes([FromQuery] DashboardFilterDto filterDto)
    {
        var data = await _dashboardService.GetTopSellEmployees_Table(filterDto);
        return Ok(RenderSuccessResponse(data: data));
    }

    [HttpGet("table/recent-orders")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetRecentOrders([FromQuery] DashboardFilterDto filterDto)
    {
        var data = await _dashboardService.GetRecentOrders_Table(filterDto);
        return Ok(RenderSuccessResponse(data: data));
    }

    [HttpGet("chart/amount-sold-of-category")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAmountSoldOfCategory([FromQuery] DashboardFilterDto filterDto)
    {
        var data = await _dashboardService.GetAmountSoldOfCategory_Chart(filterDto);
        return Ok(RenderSuccessResponse(data: data));
    }

    [HttpGet("chart/amount-sold-of-brand")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAmountSoldOfBrand([FromQuery] DashboardFilterDto filterDto)
    {
        var data = await _dashboardService.GetAmountSoldOfBrand_Chart(filterDto);
        return Ok(RenderSuccessResponse(data: data));
    }

    [HttpGet("chart/amount-sold-of-need")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAmountSoldOfNeed([FromQuery] DashboardFilterDto filterDto)
    {
        var data = await _dashboardService.GetAmountSoldOfNeed_Chart(filterDto);
        return Ok(RenderSuccessResponse(data: data));
    }

    [HttpGet("chart/overview")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetOverview([FromQuery] DashboardFilterDto filterDto)
    {
        var data = await _dashboardService.GetOverview_Chart(filterDto);
        return Ok(RenderSuccessResponse(data: data));
    }

    [HttpGet("chart/orders")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetOrders([FromQuery] DashboardFilterDto filterDto)
    {
        var data = await _dashboardService.GetOrders_Chart(filterDto);
        return Ok(RenderSuccessResponse(data: data));
    }

    [HttpGet("chart/revenue-and-profit")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetRevenueAndProfit([FromQuery] DashboardFilterDto filterDto)
    {
        var data = await _dashboardService.GetRevenueAndProfit_Chart(filterDto);
        return Ok(RenderSuccessResponse(data: data));
    }
}
