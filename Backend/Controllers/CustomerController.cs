using Backend.Authorization.PolicyProvider;
using Backend.Authorization;
using Backend.Data;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.Common.Pagging;

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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CustomerProfileDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetProfile()
    {
        var profile = await _customerService.GetProfile();

        return Ok(RenderSuccessResponse(data: profile));
    }

    [Authorize]
    [HttpPatch("profile")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CustomerProfileDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateProfile([FromBody] CustomerProfileUpdateDto customerProfileUpdateDto)
    {
        var profile = await _customerService.UpdateProfile(customerProfileUpdateDto);

        return Ok(RenderSuccessResponse<object>(message: "Update profile success.", data: profile));
    }

    [Authorize]
    [HttpGet("addresses")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<IEnumerable<ShippingAddressDto>>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetAddressList()
    {
        var addressList = await _customerService.GetAddressList();

        return Ok(RenderSuccessResponse(data: addressList));
    }

    [Authorize]
    [HttpPost("addresses")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<ShippingAddressDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CreateAddress([FromBody] ShippingAddressCreateDto shippingAddressCreateDto)
    {
        var address = await _customerService.CreateAddress(shippingAddressCreateDto);

        return Ok(RenderSuccessResponse(message: "Create shipping address success.", data: address));
    }

    [Authorize]
    [HttpPatch("addresses/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<ShippingAddressDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateAddress([FromRoute] int id, [FromBody] ShippingAddressUpdateDto shippingAddressUpdateDto)
    {
        var address = await _customerService.UpdateAddress(id, shippingAddressUpdateDto);

        return Ok(RenderSuccessResponse(message: "Update shipping address success.", data: address));
    }

    [Authorize]
    [HttpDelete("addresses/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> DeteleAddress([FromRoute] int id)
    {
        await _customerService.DeleteAddress(id);

        return Ok(RenderSuccessResponseWithoutData(message: "Delete shipping address success."));
    }

    [PermissionAuthorize(Permissions.ViewCustomer)]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<CustomerDetailDto>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListCustomers([FromQuery] CustomerFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var customerQueryable = await _customerService.GetListCustomer(filterDto);
        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: customerQueryable, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [PermissionAuthorize(Permissions.ViewCustomer)]
    [HttpGet("{customerId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CustomerDetailDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetCustomerById([FromRoute] int customerId)
    {
        var customer = await _customerService.GetCustomerById(customerId);
        return Ok(RenderSuccessResponse(data: customer));
    }

    [PermissionAuthorize(Permissions.CreateCustomer)]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CustomerDetailDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> CreateCustomer([FromBody] CustomerCreateInputDto createInputDto)
    {
        var employee = await _customerService.CreateCustomer(createInputDto);
        return Ok(RenderSuccessResponse(data: employee, message: "Create Customer success."));
    }

    [PermissionAuthorize(Permissions.UpdateCustomer)]
    [HttpPatch("{customerId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<CustomerDetailDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> UpdateCustomer([FromRoute] int customerId, [FromBody] CustomerUpdateInputDto updateInputDto)
    {
        var employee = await _customerService.UpdateCustomer(customerId, updateInputDto);
        return Ok(RenderSuccessResponse(data: employee, message: "Update Customer success."));
    }

    [PermissionAuthorize(Permissions.DeleteCustomer)]
    [HttpDelete("{customerId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<ActionResult<object>> DeleteCustomer([FromRoute] int customerId)
    {
        await _customerService.DeleteCustomer(customerId);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete Customer success."));
    }
}