using Backend.Authorization;
using Backend.Authorization.PolicyProvider;
using Backend.DTOs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/disscounts")]
public class DiscountController: BaseController
{
    private readonly IDiscountService _discountService;

    public DiscountController(IDiscountService discountService)
    {
        _discountService = discountService;
    }

    [PermissionAuthorize(Permissions.ViewDiscount)]
    [HttpGet]
    public async Task<ActionResult<object>> GetAllDiscount([FromQuery] DiscountFilterDto filterDto, [FromQuery] PagingDTO pagingDto)
    {
        var discountsQuery = await _discountService.FilterdDiscount(filterDto);

        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: discountsQuery, pageIndex: pagingDto.pageIndex, pageSize: pagingDto.pageSize)));
    }

    [PermissionAuthorize(Permissions.ViewDiscount)]
    [HttpGet("{discountId:int}")]
    public async Task<ActionResult<object>> GetDiscount([FromRoute] int discountId)
    {
        var discount = await _discountService.GetDiscountById(discountId);
        return Ok(RenderSuccessResponse(data: discount));
    }


    [PermissionAuthorize(Permissions.CreateDiscount)]
    [HttpPost]
    public async Task<ActionResult<object>> CreateDiscount([FromBody] DiscountCreateInputDto createInputDto)
    {
        var discount = await _discountService.CreateDiscount(createInputDto);
        return Ok(RenderSuccessResponse(data: discount, message: "Create discount success."));
    }


    [PermissionAuthorize(Permissions.UpdateDiscount)]
    [HttpPatch("{discountId:int}")]
    public async Task<ActionResult<object>> UpdateDiscount([FromRoute] int discountId, [FromBody] DiscountUpdateInputDto updateInputDto)
    {
        var discount = await _discountService.UpdateDiscount(discountId,updateInputDto);
        return Ok(RenderSuccessResponse(data: discount, message: "Update discount success."));
    }


    [PermissionAuthorize(Permissions.DeleteDiscount)]
    [HttpDelete("{discountId:int}")]
    public async Task<ActionResult<object>> DeleteDiscount([FromRoute] int discountId)
    {
        await _discountService.DeleteDiscount(discountId);
        return Ok(RenderSuccessResponseWithoutData(message: "Delete discount success."));
    }


}
