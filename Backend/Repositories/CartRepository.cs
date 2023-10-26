using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using Backend.DTOs;

namespace Backend.Repositories;

public class CartRepository : SqlServerRepository<Cart>, ICartRepository
{
    private readonly DBContext _context;
    private readonly DbSet<Cart> _dbSet;

    public CartRepository(DBContext context) : base(context)
    {
        _context = context;
        _dbSet = _context.Set<Cart>();
    }

    public async Task<CartDto> getCartByCustomerId(int customerId)
    {
        var cartItems = _dbSet.Where(c => c.CustomerId == customerId).OrderByDescending(c => c.CreatedAt).ToImmutableList().Select(c =>
        {
            var Discount = c.ProductsVersion.Product.Discounts.FirstOrDefault(d => d.EndDate > DateTime.Now && d.Active == true && d.Quantity > 0);

            return new CartItemDetail
            {
                Id = (int)c.Id!,
                Image = c.ProductsVersion.ImageUrl,
                Color = c.ProductsVersion.Color,
                ProductVersionId = c.ProductsVersionId,
                Quantity = c.Quantity,
                Name = c.ProductsVersion.Name,
                InStock = c.ProductsVersion.Inventory,
                Prices = new CartPrices
                {
                    IsDiscount = Discount != null,
                    OriginalPrice = c.ProductsVersion.Price,
                    Price = Discount is null ? c.ProductsVersion.Price : (int)Math.Round((decimal)(c.ProductsVersion.Price * (1 - Discount.DiscountPercent))!),
                }
            };

        }).ToImmutableList();

        return new  CartDto
        {
            Items = cartItems,
            TotalItems = cartItems.Count
        };
    }

}