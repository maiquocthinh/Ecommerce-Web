using System.Security.Claims;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/profile")]
public class ProfileController: BaseController
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [Authorize]
    [HttpGet("customer")]
    public async Task<ActionResult<CustomerProfileDto>> GetCustomerProfile()
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c=> c.Type == ClaimTypes.Email)?.Value;
        var profile = await _profileService.GetCustomerProfile(email);

        return Ok(RenderSuccessResponse(data: profile));
    }
    
    [Authorize]
    [HttpPatch("customer")]
    public async Task<ActionResult<object>> UpdateCustomerProfile(CustomerProfileUpdateDto customerProfileUpdateDto)
    {
        var email = HttpContext.User.Claims.FirstOrDefault(c=> c.Type == ClaimTypes.Email)?.Value;
        var profile = await _profileService.UpdateCustomerProfile(email, customerProfileUpdateDto);

        return Ok(RenderSuccessResponse<object>(message: "Update profile success.",data: profile));
    }
}