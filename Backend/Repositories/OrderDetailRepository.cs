using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;

namespace Backend.Repositories;

public class OrderDetailRepository : SqlServerRepository<OrderDetail>, IOrderDetailRepository
{
    public OrderDetailRepository(DBContext context) : base(context)
    {
    }
}