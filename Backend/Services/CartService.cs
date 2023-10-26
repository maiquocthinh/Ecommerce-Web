using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;

namespace Backend.Services;

public class CartService : ICartService
{
    private readonly ICartRepository _cartRepository;
    private readonly ICustomerRepository _customerRepository;

    public CartService(ICartRepository cartRepository, ICustomerRepository customerRepository)
    {
        _cartRepository = cartRepository;
        _customerRepository = customerRepository;
    }

    public async Task<CartDto> GetAllCartItems(string email)
    {
        // find customer id by email
        if (email is null) throw new UnauthorizedException("Please login to continue");
        var customerId = _customerRepository.GetByEmail(email).Result.Id;
        if (customerId is null) throw new NotFoundException("Customer not found.");

        return await _cartRepository.getCartByCustomerId((int)customerId);
    }

    public async Task CreateNewCartItem(string email, CartAddDto cartAddDto)
    {
        // find customer id by email
        if (email is null) throw new UnauthorizedException("Please login to continue");
        var customerId = _customerRepository.GetByEmail(email).Result.Id;
        if (customerId is null) throw new NotFoundException("Customer not found.");

        // create new cart item
        var cartItem = _cartRepository.Where(c =>
            c.CustomerId == customerId && c.ProductsVersionId == cartAddDto.ProductVersionId).Result.FirstOrDefault();
        if (cartItem is null)
        {
            await _cartRepository.Add(new Cart
            {
                CustomerId = (int)customerId!,
                ProductsVersionId = cartAddDto.ProductVersionId,
                Quantity = cartAddDto.Quantity,
            });
        }
        else
        {
            cartItem.Quantity += cartAddDto.Quantity;
            await _cartRepository.Update(cartItem);
        }
    }

    public async Task UpdateCartItem(string email, int id, CartUpdateDto cartUpdateDto)
    {
        // find customer
        if (email is null) throw new UnauthorizedException("Please login to continue");
        var customerId = _customerRepository.GetByEmail(email).Result.Id;
        if (customerId is null) throw new NotFoundException("Customer not found.");

        // update cart item
        var cartItem = await _cartRepository.GetById(id);
        if (cartItem is null)
            throw new NotFoundException("Cart item not found.");
        if (cartItem.CustomerId != customerId)
            throw new ForbiddenException("Forbidden");

        cartItem.Quantity = cartUpdateDto.Quantity;
        await _cartRepository.Update(cartItem);
    }

    public async Task DeleteCartItem(string email, int id)
    {
        // find customer
        if (email is null) throw new UnauthorizedException("Please login to continue");
        var customerId = _customerRepository.GetByEmail(email).Result.Id;
        if (customerId is null) throw new NotFoundException("Customer not found.");
        // delete cart item
        var cartItem = await _cartRepository.GetById(id);
        if (cartItem is null)
            throw new NotFoundException("Cart item not found.");
        if (cartItem.CustomerId != customerId)
            throw new ForbiddenException("Forbidden");

        await _cartRepository.Remove(id);
    }
}