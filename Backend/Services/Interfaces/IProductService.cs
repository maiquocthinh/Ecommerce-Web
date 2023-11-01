using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IProductService
{
    Task<IQueryable<ProductShortInfoDto>> FilterProduct(ProductFilterInputDto productFilterInputDto);
    Task<object> GetProductDetailInfo(int productId);
}