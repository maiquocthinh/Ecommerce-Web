using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IOrderDetailRepository : IRepository<OrderDetail>, IRepositoryQueryable<OrderDetail>
{
    Task<OrderDetail> GetByCutomerIdAndProductVersionId(int customerId, int productVersionId);
}