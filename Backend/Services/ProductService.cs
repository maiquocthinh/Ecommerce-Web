using AutoMapper;
using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class ProductSortedBy
{
    public const string PriceAsc = "PriceAsc";
    public const string PriceDesc = "PriceDesc";
    public const string New = "New";
}

public class ProductService : IProductService
{
    private readonly IMapper _mapper;
    private readonly IProductRepository _productRepository;
    private readonly IProductVersionRepository _productVersionRepository;

    public ProductService(IMapper mapper, IProductRepository productRepository, IProductVersionRepository productVersionRepository)
    {
        _mapper = mapper;
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


    public async Task<IQueryable<ProductShortInfoDto>> GetListProductsInClient(ProductFilterInputDto productFilterInputDto)
    {
        // filter in db
        var query = _productRepository.GetQueryable().Where(p => p.Viewable == true)
            .Where(p => p.ProductVersions.Count > 0).AsQueryable();
        {


            if (!string.IsNullOrEmpty(productFilterInputDto.Keyword))
            {
                query = query.Where(p => p.Name.Contains(productFilterInputDto.Keyword));
            }

            if (productFilterInputDto.Filters != null)
            {
                if (productFilterInputDto.Filters.CategoryId.HasValue)
                {
                    query = query.Where(p => p.CategoryId == productFilterInputDto.Filters.CategoryId);
                }

                if (productFilterInputDto.Filters.BrandId.HasValue)
                {
                    query = query.Where(p => p.BrandId == productFilterInputDto.Filters.BrandId);
                }

                if (productFilterInputDto.Filters.NeedId.HasValue)
                {
                    query = query.Where(p => p.NeedId == productFilterInputDto.Filters.NeedId);
                }

                if (productFilterInputDto.Filters.PriceRange != null)
                {
                    query = query.Where(p => p.ProductVersions.Any(pv =>
                        pv.Price >= productFilterInputDto.Filters.PriceRange.MinPrice &&
                        pv.Price <= productFilterInputDto.Filters.PriceRange.MaxPrice)
                    );
                }

                if (productFilterInputDto.Filters.IsOutOfStock)
                {
                    query = query.Where(p => !p.ProductVersions.Any(pv => pv.Inventory > 0));
                }
                else
                {
                    query = query.Where(p => p.ProductVersions.Any(pv => pv.Inventory > 0));
                }
            }
        }

        return query.Select(p => new ProductShortInfoDto
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

    public async Task<ProductDetailDto> GetProductDetailInfo(int productId)
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


    public async Task<IQueryable<Product>> GetListProducts(ProductFilterExtendInputDto filter)
    {
        var query = _productRepository.GetQueryable().OrderByDescending(p => p.CreatedAt).AsQueryable();
        {
            if (!string.IsNullOrEmpty(filter.Keyword))
            {
                query = query.Where(p => p.Name.Contains(filter.Keyword));
            }

            if (filter.Filters != null)
            {
                if (filter.Filters.CategoryId.HasValue)
                {
                    query = query.Where(p => p.CategoryId == filter.Filters.CategoryId);
                }

                if (filter.Filters.BrandId.HasValue)
                {
                    query = query.Where(p => p.BrandId == filter.Filters.BrandId);
                }

                if (filter.Filters.NeedId.HasValue)
                {
                    query = query.Where(p => p.NeedId == filter.Filters.NeedId);
                }

                if (filter.Filters.PriceRange != null)
                {
                    query = query.Where(p => p.ProductVersions.Any(pv =>
                        pv.Price >= filter.Filters.PriceRange.MinPrice &&
                        pv.Price <= filter.Filters.PriceRange.MaxPrice)
                    );
                }

                if (filter.Filters.Viewable != null)
                {
                    query = query.Where(p => p.Viewable == filter.Filters.Viewable);
                }


                if (filter.Filters.OutOfStock != null)
                {
                    query = query.Where(p => (p.ProductVersions.Any(pv => pv.Inventory > 0) != filter.Filters.OutOfStock));
                }
            }
        }

        return query;
    }

    public async Task<Product> CreateProduct(ProductCreateInputDto createInputDto)
    {
        var product = await _productRepository.Add(_mapper.Map<Product>(createInputDto));
        return product;
    }

    public async Task<Product> UpdateProduct(int id, ProductUpdateInputDto updateInputDto)
    {
        var product = await _productRepository.GetById(id);
        if (product == null) throw new NotFoundException("Product not found.");

        if (updateInputDto.Name != null) product.Name = updateInputDto.Name;
        if (updateInputDto.Description != null) product.Description = updateInputDto.Description;
        if (updateInputDto.ImageUrl != null) product.ImageUrl = updateInputDto.ImageUrl;
        if (updateInputDto.Warranty != null) product.Warranty = updateInputDto.Warranty;
        if (updateInputDto.CategoryId != null) product.CategoryId = (int)updateInputDto.CategoryId;
        if (updateInputDto.BrandId != null) product.BrandId = (int)updateInputDto.BrandId;
        if (updateInputDto.NeedId != null) product.NeedId = updateInputDto.NeedId;
        if (updateInputDto.Viewable != null) product.Viewable = (bool)updateInputDto.Viewable;

        try
        {
            await _productRepository.Update(product);
        }
        catch (DbUpdateException e)
        {
            if (e.InnerException is SqlException sqlException)
                foreach (SqlError error in sqlException.Errors)
                    if (error.Number == 50000)
                        throw new BadRequestException(error.Message);
        }

        return product;
    }


    public async Task<bool> DeleteProduct(int id)
    {
        await _productRepository.Remove(id);
        return true;
    }

    public async Task<ProductVersion> CreateProductVersion(ProductVersionCreateInputDto createInputDto)
    {
        var productVersion = await _productVersionRepository.Add(_mapper.Map<ProductVersion>(createInputDto));
        return productVersion;
    }

    public async Task<ProductVersion> UpdateProductVersion(int id, ProductVersionUpdateInputDto updateInputDto)
    {
        var productVersion = await _productVersionRepository.GetById(id);
        if (productVersion == null) throw new NotFoundException("Product version not found.");

        if (updateInputDto.Name != null) productVersion.Name = updateInputDto.Name;
        if (updateInputDto.ImageUrl != null) productVersion.ImageUrl = updateInputDto.ImageUrl;
        if (updateInputDto.Color != null) productVersion.Color = updateInputDto.Color;
        if (updateInputDto.Specifications != null) productVersion.Specifications = updateInputDto.Specifications;
        if (updateInputDto.Price != null) productVersion.Price = (int)updateInputDto.Price;

        await _productVersionRepository.Update(productVersion);

        return productVersion;
    }

    public async Task<bool> DeleteProductVersion(int id)
    {
        await _productVersionRepository.Remove(id);
        return true;
    }

}