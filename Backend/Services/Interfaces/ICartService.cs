using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface ICartService
{
    Task<CartDto> GetAllCartItems(string email);
    Task CreateNewCartItem(string email, CartAddDto cartAddDto);
    Task UpdateCartItem(string email, int id, CartUpdateDto cartUpdateDto);
    Task DeleteCartItem(string email, int id);
}