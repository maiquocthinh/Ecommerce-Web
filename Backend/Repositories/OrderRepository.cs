using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;

namespace Backend.Repositories;

public class OrderRepository : SqlServerRepository<Order>, IOrderRepository
{
    public OrderRepository(DBContext context) : base(context)
    {
    }
}