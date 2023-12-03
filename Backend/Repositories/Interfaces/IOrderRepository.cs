using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Interfaces;

public interface IOrderRepository : IRepository<Order>, IRepositoryQueryable<Order>
{
}