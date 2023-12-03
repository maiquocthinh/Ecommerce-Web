using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface IReviewService
{
    Task<AllReviewOfProductDto> GetReivewsOfProduct(int productId);
    Task<ReviewTinyDto> PostReview(ReviewInputDto reviewInputDto);
    Task<IQueryable<ReviewTinyDto>> GetListReview(ReviewFilterDto filterDto);
    Task<ReviewDto> GetReviewDetail(int reviewId);
    Task PostReviewReply(int reviewId, ReviewReplyInputDto inputDto);
    Task EditReviewReply(int reviewId, ReviewReplyInputDto inputDto);
    Task DeleteReviewReply(int reviewId);
}