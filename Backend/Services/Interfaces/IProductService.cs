using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IProductService
{
    Task<IQueryable<ProductShortInfoDto>> FilterProduct(ProductFilterInputDto productFilterInputDto);
    Task<ProductDetailDto> GetProductDetailInfo(int productId);
    Task<IQueryable<Product>> GetListProducts(ProductFilterExtendInputDto filter);
    Task<Product> CreateProduct(ProductCreateInputDto createInputDto);
    Task<Product> UpdateProduct(int id, ProductUpdateInputDto updateInputDto);
    Task<bool> DeleteProduct(int id);
    Task<ProductVersion> CreateProductVersion(ProductVersionCreateInputDto createInputDto);
    Task<ProductVersion> UpdateProductVersion(int id, ProductVersionUpdateInputDto updateInputDto);
    Task<bool> DeleteProductVersion(int id);
}