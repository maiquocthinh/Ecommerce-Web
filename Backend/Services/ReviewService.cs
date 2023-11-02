using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Jwt;
using Backend.Repositories;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;

namespace Backend.Services;


public class ReviewService : IReviewService
{
    private readonly HttpContext _httpContext;
    private readonly IReviewRepository _reviewRepository;
    private readonly IOrderDetailRepository _orderDetailRepository;
    private readonly ICustomerRepository _customerRepository;

    public ReviewService(IHttpContextAccessor httpContextAccessor, IReviewRepository reviewRepository, IOrderDetailRepository orderDetailRepository, ICustomerRepository customerRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _reviewRepository = reviewRepository;
        _orderDetailRepository = orderDetailRepository;
        _customerRepository = customerRepository;
    }

    public async Task<AllReviewOfProductDto> GetReivewsOfProduct(int productId)
    {
        var reviews = await _reviewRepository.Where(r => r.ProductVersion.ProductId == productId);

        return new AllReviewOfProductDto
        {
            Reviews = reviews.Select(r => new ReviewOfProductDto
            {
                Id = r.Id,
                Content = r.Content,
                Score = r.Score,
                ProductVersionName = r.ProductVersion.Name,
                Reply = r.ReviewsReplies.Select(rr => new ReviewReplyDto
                {
                    Id = rr.Id,
                    Content = rr.Content,
                }).FirstOrDefault()
            }),
            TotalReview = reviews.Count(),
            AveraegScore = reviews.Count() > 0 ? reviews.Sum(r => r.Score) / reviews.Count() : 0
        };
    }

    public async Task<ReviewOfProductDto> PostReview(ReviewInputDto reviewInputDto)
    {
        // validate customer
        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        // check customer bought product?
        var orderDetail = await _orderDetailRepository.GetByCutomerIdAndProductVersionId(customerId, reviewInputDto.ProductVersionId);
        if (orderDetail is null) throw new ConflictException("Must purchase this product to review.");
        if (orderDetail.Order.Status != OrderStatus.Shipped) throw new ConflictException("Product must be received to review.");

        // check have any review with this product?
        var oldReview = await _reviewRepository.GetByCustomerIdAndProductVersionId(customerId, reviewInputDto.ProductVersionId);
        if (oldReview != null) throw new ConflictException("You have already reivew this product.");

        // create new review
        var review = await _reviewRepository.Add(new Review
        {
            Content = reviewInputDto.Content,
            Score = reviewInputDto.Score,
            CustomerId = customerId,
            ProductVersionId = orderDetail.ProductVersionId
        });

        return new ReviewOfProductDto
        {
            Id = review.Id,
            Content = review.Content,
            Score = review.Score,
            ProductVersionName = orderDetail.ProductVersion.Name,
        };
    }
}