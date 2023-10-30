using Backend.Data;
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
    public async Task<ActionResult<SuccessResponse<CustomerProfileDto>>> GetProfile()
    {
        var profile = await _customerService.GetProfile();

        return Ok(RenderSuccessResponse(data: profile));
    }

    [Authorize]
    [HttpPatch("profile")]
    public async Task<ActionResult<SuccessResponse<CustomerProfileDto>>> UpdateProfile([FromBody] CustomerProfileUpdateDto customerProfileUpdateDto)
    {
        var profile = await _customerService.UpdateProfile(customerProfileUpdateDto);

        return Ok(RenderSuccessResponse<object>(message: "Update profile success.", data: profile));
    }

    [Authorize]
    [HttpGet("addresses")]
    public async Task<ActionResult<SuccessResponse<IEnumerable<ShippingAddressDto>>>> GetAddressList()
    {
        var addressList = await _customerService.GetAddressList();

        return Ok(RenderSuccessResponse<IEnumerable<ShippingAddressDto>>(data: addressList));
    }

    [Authorize]
    [HttpPost("addresses")]
    public async Task<ActionResult<SuccessResponse<ShippingAddressDto>>> CreateAddress([FromBody] ShippingAddressCreateDto shippingAddressCreateDto)
    {
        var address = await _customerService.CreateAddress(shippingAddressCreateDto);

        return Ok(RenderSuccessResponse<ShippingAddressDto>(message: "Create shipping address success.", data: address));
    }

    [Authorize]
    [HttpPatch("addresses/{id}")]
    public async Task<ActionResult<SuccessResponse<ShippingAddressDto>>> UpdateAddress([FromRoute] int id, [FromBody] ShippingAddressUpdateDto shippingAddressUpdateDto)
    {
        var address = await _customerService.UpdateAddress(id, shippingAddressUpdateDto);

        return Ok(RenderSuccessResponse<ShippingAddressDto>(message: "Update shipping address success.", data: address));
    }

    [Authorize]
    [HttpDelete("addresses/{id}")]
    public async Task<ActionResult<SuccessResponseWithoutData>> DeteleAddress([FromRoute] int id)
    {
        await _customerService.DeleteAddress(id);

        return Ok(RenderSuccessResponseWithoutData(message: "Delete shipping address success."));
    }
}