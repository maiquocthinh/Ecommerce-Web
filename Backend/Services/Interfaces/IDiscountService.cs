using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IDiscountService
{
    Task<IQueryable<DiscountDTO>> FilterdDiscount(DiscountFilterDto filterDto);
    Task<DiscountDTO> GetDiscountById(int discountId);
    Task<DiscountDTO> CreateDiscount(DiscountCreateInputDto createInputDto);
    Task<DiscountDTO> UpdateDiscount(int discountId, DiscountUpdateInputDto updateInputDto);
    Task<bool> DeleteDiscount(int discountId);
}