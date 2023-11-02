using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;

namespace Backend.Repositories;

public class ReviewReplyRepository : SqlServerRepository<ReviewsReply>, IReviewReplyRepository
{
    public ReviewReplyRepository(DBContext context) : base(context)
    {
    }
}