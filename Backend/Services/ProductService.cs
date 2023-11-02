using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using System.Drawing;

namespace Backend.Services;

public class ProductSortedBy
{
    public const string PriceAsc = "PriceAsc";
    public const string PriceDesc = "PriceDesc";
    public const string New = "New";
}

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IProductVersionRepository _productVersionRepository;

    public ProductService(IProductRepository productRepository, IProductVersionRepository productVersionRepository)
    {
        _productRepository = productRepository;
        _productVersionRepository = productVersionRepository;
    }


    private static Discount? GetDiscount(Product p)
    {
        return p.Discounts.FirstOrDefault(d => d.EndDate > DateTime.Now && d.Active == true && d.Quantity > 0);
    }
    private static ProductVersion? GetProductVersionWithMinPrice(Product p)
    {
        return p.ProductVersions.OrderBy(pv => pv.Price).FirstOrDefault();
    }


    public async Task<IQueryable<ProductShortInfoDto>> FilterProduct(ProductFilterInputDto productFilterInputDto)
    {
        var products = await _productRepository.GetFilteredProducts(productFilterInputDto);
        return products.Select(p => new ProductShortInfoDto
        {
            Id = p.Id,
            ImageUrl = p.ImageUrl,
            Name = p.Name,
            OriginPrice = GetProductVersionWithMinPrice(p)!.Price,
            Price = GetDiscount(p) == null ? GetProductVersionWithMinPrice(p)!.Price : (int)Math.Round((decimal)(GetProductVersionWithMinPrice(p)!.Price * (1 - GetDiscount(p).DiscountPercent))!),
            DiscountPercent = (short)(GetDiscount(p) == null ? 0 : GetDiscount(p).DiscountPercent * 100),
            ReviewsScore = p.ReviewsScore,
            IsOutOfStock = !p.ProductVersions.Any(pv => pv.Inventory > 0),
            Catalogs = new ProductCatalogs
            {
                CategoryId = p.CategoryId,
                BrandId = p.BrandId,
                NeedId = p.NeedId,
            }
        });

    }

    public async Task<object> GetProductDetailInfo(int productId)
    {
        var product = (await _productRepository.Where(p => p.Id == productId && p.Viewable == true && p.ProductVersions.Count > 0)).FirstOrDefault();
        if (product is null) throw new NotFoundException("Product not found!");
        var Discount = product?.Discounts.FirstOrDefault(d => d.EndDate > DateTime.Now && d.Active == true && d.Quantity > 0);

        return new ProductDetailDto
        {
            Id = product.Id,
            ImageUrl = product.ImageUrl,
            Name = product.Name,
            Description = product.Description,
            ReviewsScore = product.ReviewsScore,
            Warranty = product.Warranty,
            ProductVersions = product.ProductVersions.Select(pv => new ProductVersionDetail
            {
                Id = pv.Id,
                ImageUrl = pv.ImageUrl,
                Name = pv.Name,
                Color = pv.Color,
                Specifications = pv.Specifications,
                OriginPrice = pv.Price,
                Price = (int)(Discount is null ? pv.Price : Discount.DiscountPercent * pv.Price),
                IsOutOfStock = pv.Inventory <= 0,
            }),
            Catalogs = new ProductCatalogs
            {
                CategoryId = product.CategoryId,
                BrandId = product.BrandId,
                NeedId = product.NeedId,
            }
        };
    }

}