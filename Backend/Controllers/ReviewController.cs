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
[Route("api/reviews")]
public class ReviewController : BaseController
{
    private readonly IReviewService _reviewService;

    public ReviewController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [AllowAnonymous]
    [HttpGet("{productId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<AllReviewOfProductDto>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetReviewOfProduct([FromRoute] int productId)
    {
        var reviews = await _reviewService.GetReivewsOfProduct(productId);

        return Ok(RenderSuccessResponse(data: reviews));

    }

    [Authorize]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<ReviewDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> PostReview(ReviewInputDto reviewInputDto)
    {
        var review = await _reviewService.PostReview(reviewInputDto);

        return Ok(RenderSuccessResponse(data: review));
    }

    [PermissionAuthorize(Permissions.ViewReview)]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<PagingListModel<ReviewTinyDto>>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetListReview([FromQuery] ReviewFilterDto filterDto, [FromQuery] PagingDTO pagingDTO)
    {
        var reviewQueryable = await _reviewService.GetListReview(filterDto);

        return Ok(RenderSuccessResponse(data: RenderPagingListModel(source: reviewQueryable, pageIndex: pagingDTO.pageIndex, pageSize: pagingDTO.pageSize)));
    }


    [PermissionAuthorize(Permissions.ViewReview)]
    [HttpGet("{reviewId:int}/detail")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<ReviewDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> GetDetailReview([FromRoute] int reviewId)
    {
        var reviewDetail = await _reviewService.GetReviewDetail(reviewId);
        return Ok(RenderSuccessResponse(data: reviewDetail));
    }

    [PermissionAuthorize(Permissions.ReplyReview)]
    [HttpPost("{reviewId:int}/reply")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> PostReviewReply([FromRoute] int reviewId, [FromBody] ReviewReplyInputDto inputDto)
    {
        await _reviewService.PostReviewReply(reviewId, inputDto);
        return Ok(RenderSuccessResponseWithoutData("Reply success"));
    }

    [PermissionAuthorize(Permissions.ReplyReview)]
    [HttpPatch("{reviewId:int}/reply")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> EditReviewReply([FromRoute] int reviewId, [FromBody] ReviewReplyInputDto inputDto)
    {
        await _reviewService.EditReviewReply(reviewId, inputDto);
        return Ok(RenderSuccessResponseWithoutData("Edit reply success"));
    }

    [HttpDelete("{reviewId:int}/reply")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponseWithoutData))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
    public async Task<IActionResult> DeleteReviewReply([FromRoute] int reviewId)
    {
        await _reviewService.DeleteReviewReply(reviewId);
        return Ok(RenderSuccessResponseWithoutData("Delete reply success"));
    }
}
