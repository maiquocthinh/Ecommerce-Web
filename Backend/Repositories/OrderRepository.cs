using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public static class OrderStatus
{
    public const string Processing = "processing";
    public const string Shipped = "shipped";
    public const string Delivering = "delivering";
    public const string Cancelled = "cancelled";
};

public class OrderRepository : SqlServerRepository<Order>, IOrderRepository
{
    public OrderRepository(DBContext context) : base(context)
    {
    }
}