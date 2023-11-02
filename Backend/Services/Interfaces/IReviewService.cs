using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IReviewService
{
    Task<AllReviewOfProductDto> GetReivewsOfProduct(int productId);
    Task<ReviewOfProductDto> PostReview(ReviewInputDto reviewInputDto);
}