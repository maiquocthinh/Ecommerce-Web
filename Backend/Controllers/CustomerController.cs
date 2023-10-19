using System.Security.Claims;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/customer")]
public class CustomerController : BaseController
{
    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<ActionResult<CustomerProfileDto>> GetProfile()
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var profile = await _customerService.GetProfile(email);

        return Ok(RenderSuccessResponse(data: profile));
    }

    [Authorize]
    [HttpPatch("profile")]
    public async Task<ActionResult<CustomerProfileDto>> UpdateProfile([FromBody] CustomerProfileUpdateDto customerProfileUpdateDto)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var profile = await _customerService.UpdateProfile(email, customerProfileUpdateDto);

        return Ok(RenderSuccessResponse<object>(message: "Update profile success.", data: profile));
    }

    [Authorize]
    [HttpGet("addresses")]
    public async Task<ActionResult<object>> GetAddressList()
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var addressList = await _customerService.GetAddressList(email);

        return Ok(RenderSuccessResponse<object>(data: addressList));
    }

    [Authorize]
    [HttpPost("addresses")]
    public async Task<ActionResult<ShippingAddressDto>> CreateAddress([FromBody] ShippingAddressCreateDto shippingAddressCreateDto)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var addressList = await _customerService.CreateAddress(email, shippingAddressCreateDto);

        return Ok(RenderSuccessResponse<ShippingAddressDto>(message: "Create shipping address success.", data: addressList));
    }

    [Authorize]
    [HttpPatch("addresses/{id}")]
    public async Task<ActionResult<ShippingAddressDto>> UpdateAddress([FromRoute] long id, [FromBody] ShippingAddressUpdateDto shippingAddressUpdateDto)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var addressList = await _customerService.UpdateAddress(email, id, shippingAddressUpdateDto);

        return Ok(RenderSuccessResponse<ShippingAddressDto>(message: "Update shipping address success.", data: addressList));
    }

    [Authorize]
    [HttpDelete("addresses/{id}")]
    public async Task<IActionResult> DeteleAddress([FromRoute] long id)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        await _customerService.DeleteAddress(email, id);

        return Ok(RenderSuccessResponse<object>(message: "Delete shipping address success."));
    }
}