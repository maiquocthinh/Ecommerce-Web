using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IReviewRepository : IRepository<Review>, IRepositoryQueryable<Review>
{
    Task<Review> GetByCustomerIdAndProductVersionId(int customerId, int productVersionId);   
}