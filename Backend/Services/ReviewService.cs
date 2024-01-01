using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Jwt;
using Backend.Repositories;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;


public class ReviewService : IReviewService
{
    private readonly HttpContext _httpContext;
    private readonly IMapper _mapper;
    private readonly IReviewRepository _reviewRepository;
    private readonly IReviewReplyRepository _reviewReplyRepository;
    private readonly IOrderDetailRepository _orderDetailRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly IEmployeeRepository _employeeRepository;

    public ReviewService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
        IReviewRepository reviewRepository, IReviewReplyRepository reviewReplyRepository, IOrderDetailRepository orderDetailRepository,
        ICustomerRepository customerRepository, IEmployeeRepository employeeRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _mapper = mapper;
        _reviewRepository = reviewRepository;
        _reviewReplyRepository = reviewReplyRepository;
        _orderDetailRepository = orderDetailRepository;
        _customerRepository = customerRepository;
        _employeeRepository = employeeRepository;
    }

    public async Task<AllReviewOfProductDto> GetReivewsOfProduct(int productId)
    {
        var reviews = await _reviewRepository.Where(r => r.ProductVersion.ProductId == productId);

        return new AllReviewOfProductDto
        {
            Reviews = reviews.Select(r => _mapper.Map<ReviewDto>(r)),
            TotalReview = reviews.Count(),
            AveraegScore = reviews.Count() > 0 ? reviews.Sum(r => r.Score) / reviews.Count() : 0
        };
    }

    public async Task<ReviewTinyDto> PostReview(ReviewInputDto reviewInputDto)
    {
        // validate customer
        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        // check customer bought product?
        var orderDetail = await _orderDetailRepository.GetByCutomerIdAndProductVersionId(customerId, reviewInputDto.ProductVersionId);
        if (orderDetail is null) throw new ConflictException("Must purchase this product to review.");
        //if (orderDetail.Order.Status != OrderStatus.Shipped) throw new ConflictException("Product must be received to review.");

        // check have any review with this product?
        var oldReview = await _reviewRepository.GetByCustomerIdAndProductVersionId(customerId, reviewInputDto.ProductVersionId);
        if (oldReview != null) throw new ConflictException("You have already reivew this product.");
    
        // create new review
        var review = await _reviewRepository.Add(new Review
        {
            Content = reviewInputDto.Content,
            Score = reviewInputDto.Score,
            CustomerId = customerId,
            ProductVersionId = orderDetail.ProductVersionId,
        });

        return _mapper.Map<ReviewTinyDto>(review);
    }

    public async Task<IQueryable<ReviewTinyDto>> GetListReview(ReviewFilterDto filterDto)
    {
        var query = _reviewRepository.GetQueryable().OrderByDescending(r => r.CreatedAt).AsQueryable();
        {
            if (filterDto.ProductId != null)
            {
                query = query.Where(r => r.ProductVersion.ProductId == filterDto.ProductId);
            }

            if (filterDto.IsReply != null)
            {
                if ((bool)filterDto.IsReply)
                    query = query.Where(r => r.ReviewsReplies.Count > 0);
                else
                    query = query.Where(r => r.ReviewsReplies.Count == 0);
            }

            if (filterDto.StartDate != null)
            {
                query = query.Where(r => r.CreatedAt >= filterDto.StartDate);
            }

            if (filterDto.EndDate != null)
            {
                query = query.Where(o => o.CreatedAt <= filterDto.EndDate);
            }

            if (filterDto.MinScore != null)
            {
                query = query.Where(r => r.Score >= filterDto.MinScore);
            }

            if (filterDto.MaxScore != null)
            {
                query = query.Where(r => r.Score <= filterDto.MaxScore);
            }
        }

        return query.Select(r => _mapper.Map<ReviewTinyDto>(r));
    }

    public async Task<ReviewDto> GetReviewDetail(int reviewId)
    {
        var review = await _reviewRepository.GetById(reviewId);
        if (review == null) throw new NotFoundException("Review not found!");

        return _mapper.Map<ReviewDto>(review);
    }

    public async Task PostReviewReply(int reviewId, ReviewReplyInputDto inputDto)
    {
        // validate employee
        int employeeId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.EmployeeId)?.Value);
        var employee = await _employeeRepository.GetById(employeeId);
        if (employee == null) throw new NotFoundException("Employee not found.");

        // validate review
        var review = await _reviewRepository.GetById(reviewId);
        if (review == null) throw new NotFoundException("Review not found.");

        // create review reply
        try
        {
            await _reviewReplyRepository.Add(new ReviewsReply
            {
                ReviewsId = reviewId,
                Content = inputDto.Content,
                EmployeeId = employeeId,
            });
        }
        catch (DbUpdateException e)
        {
            if (e.InnerException is SqlException sqlException)
                foreach (SqlError error in sqlException.Errors)
                    if (error.Number == 50000)
                        throw new ConflictException(error.Message);
        }
    }

    public async Task EditReviewReply(int reviewId, ReviewReplyInputDto inputDto)
    {
        // validate employee
        int employeeId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.EmployeeId)?.Value);
        var employee = await _employeeRepository.GetById(employeeId);
        if (employee == null) throw new NotFoundException("Employee not found.");

        // validate review
        var review = await _reviewRepository.GetById(reviewId);
        if (review == null) throw new NotFoundException("Review not found.");

        // validate review reply
        var reviewReply = review.ReviewsReplies.FirstOrDefault();
        if (reviewReply == null) throw new NotFoundException("Review reply not found.");

        // update review reply
        reviewReply.EmployeeId = employeeId;
        reviewReply.Content = inputDto.Content;

        await _reviewReplyRepository.Update(reviewReply);
    }

    public async Task DeleteReviewReply(int reviewId)
    {
        // validate review
        var review = await _reviewRepository.GetById(reviewId);
        if (review == null) throw new NotFoundException("Review not found.");

        // validate review reply
        var reviewReply = review.ReviewsReplies.FirstOrDefault();
        if (reviewReply == null) throw new NotFoundException("Review reply not found.");

        // delete review reply
        await _reviewReplyRepository.Remove(reviewReply.Id);
    }
}