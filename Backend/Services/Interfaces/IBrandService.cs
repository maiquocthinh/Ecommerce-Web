using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IBrandService
{
    Task<IEnumerable<BrandDto>> GetAllBrand();
}