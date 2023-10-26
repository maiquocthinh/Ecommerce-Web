using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface ICartRepository : IRepository<Cart>
{
    Task<CartDto> getCartByCustomerId(int customerId);
}