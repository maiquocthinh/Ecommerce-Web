using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Jwt;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using System.Security.Claims;

namespace Backend.Services;

public class CartService : ICartService
{
    private readonly HttpContext _httpContext;
    private readonly ICartRepository _cartRepository;
    private readonly ICustomerRepository _customerRepository;

    public CartService(IHttpContextAccessor httpContextAccessor, ICartRepository cartRepository, ICustomerRepository customerRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _cartRepository = cartRepository;
        _customerRepository = customerRepository;
    }

    public async Task<CartDto> GetAllCartItems()
    {
        // validate customer
        var customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        return await _cartRepository.getCartByCustomerId((int)customerId);
    }

    public async Task CreateNewCartItem(CartAddDto cartAddDto)
    {
        // validate customer
        var customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

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

    public async Task UpdateCartItem(int id, CartUpdateDto cartUpdateDto)
    {
        // validate customer
        var customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        // update cart item
        var cartItem = await _cartRepository.GetById(id);
        if (cartItem is null)
            throw new NotFoundException("Cart item not found.");
        if (cartItem.CustomerId != customerId)
            throw new ForbiddenException("Forbidden");

        cartItem.Quantity = cartUpdateDto.Quantity;
        await _cartRepository.Update(cartItem);
    }

    public async Task DeleteCartItem(int id)
    {
        // validate customer
        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        // delete cart item
        var cartItem = await _cartRepository.GetById(id);
        if (cartItem is null)
            throw new NotFoundException("Cart item not found.");
        if (cartItem.CustomerId != customerId)
            throw new ForbiddenException("Forbidden");

        await _cartRepository.Remove(id);
    }
}