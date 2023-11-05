using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IBrandService
{
    Task<IEnumerable<BrandDto>> GetAllBrand();
    Task<IQueryable<BrandDto>> FilteredBrand(BrandFilterDto filterDto);
    Task<BrandDto> GetBrand(int id);
    Task<BrandDto> CreateBrand(BrandCreateInputDto createInputDto);
    Task<BrandDto> UpdateBrand(int id, BrandUpdateInputDto updateInputDto);
    Task<bool> DeleteBrand(int id);
}