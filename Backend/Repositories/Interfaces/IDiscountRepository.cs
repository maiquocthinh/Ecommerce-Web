using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IDiscountRepository : IRepository<Discount>, IRepositoryQueryable<Discount>
{
}