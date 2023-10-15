using System.Security.Claims;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/customer")]
public class CustomerController: BaseController
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
        var email = HttpContext.User.Claims.FirstOrDefault(c=> c.Type == ClaimTypes.Email)?.Value;
        var profile = await _customerService.GetProfile(email);

        return Ok(RenderSuccessResponse(data: profile));
    }
    
    [Authorize]
    [HttpPatch("profile")]
    public async Task<ActionResult<CustomerProfileDto>> UpdateProfile(CustomerProfileUpdateDto customerProfileUpdateDto)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c=> c.Type == ClaimTypes.Email)?.Value;
        var profile = await _customerService.UpdateProfile(email, customerProfileUpdateDto);

        return Ok(RenderSuccessResponse<object>(message: "Update profile success.",data: profile));
    }
    
    [Authorize]
    [HttpGet("address_list")]
    public async Task<ActionResult<object>> GetAddressList()
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c=> c.Type == ClaimTypes.Email)?.Value;
        var addressList = await _customerService.GetAddressList(email);

        return Ok(RenderSuccessResponse<object>(data: addressList));
    }
}