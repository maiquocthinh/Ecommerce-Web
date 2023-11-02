using Backend.DTOs;
using Backend.Models;
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


    [HttpGet("{productId:int}")]
    public async Task<ActionResult<AllReviewOfProductDto>> GetReviewOfProduct([FromRoute] int productId)
    {
        var reviews = await _reviewService.GetReivewsOfProduct(productId);

        return Ok(RenderSuccessResponse(data: reviews));

    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ReviewOfProductDto>> PostReview(ReviewInputDto reviewInputDto)
    {
        var review = await _reviewService.PostReview(reviewInputDto);

        return Ok(RenderSuccessResponse(data: review));
    }

}
