using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface ICartService
{
    Task<CartDto> GetAllCartItems();
    Task CreateNewCartItem(CartAddDto cartAddDto);
    Task UpdateCartItem(int id, CartUpdateDto cartUpdateDto);
    Task DeleteCartItem(int id);
}