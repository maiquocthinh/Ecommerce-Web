using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;
using Backend.Models;
using Backend.Common.Exceptions;

namespace Backend.Services;


public class BrandService : IBrandService
{
    private readonly HttpContext _httpContext;
    private readonly IMapper _mapper;
    private readonly IBrandRepository _brandRepository;

    public BrandService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IBrandRepository brandRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _mapper = mapper;
        _brandRepository = brandRepository;
    }

    public async Task<IEnumerable<BrandDto>> GetAllBrand()
    {
        var brands = await _brandRepository.GetAll();
        return brands.Select(b => _mapper.Map<BrandDto>(b));
    }

    public async Task<IQueryable<BrandDto>> FilteredBrand(BrandFilterDto filterDto)
    {
        return (await _brandRepository.FilteredCategory(filterDto)).Select(b => _mapper.Map<BrandDto>(b));
    }

    public async Task<BrandDto> CreateBrand(BrandCreateInputDto createInputDto)
    {
        var brand = await _brandRepository.Add(_mapper.Map<Brand>(createInputDto));
        return _mapper.Map<BrandDto>(brand);
    }

    public async Task<bool> DeleteBrand(int id)
    {
        return await _brandRepository.Remove(id);
    }

    public async Task<BrandDto> GetBrand(int id)
    {
        var brand = await _brandRepository.GetById(id);
        if (brand == null) throw new NotFoundException("Brand not found");
        return _mapper.Map<BrandDto>(brand);
    }

    public async Task<BrandDto> UpdateBrand(int id, BrandUpdateInputDto updateInputDto)
    {
        var brand = await _brandRepository.GetById(id);
        if (brand == null) throw new NotFoundException("Brand not found");

        if(updateInputDto.Name != null) brand.Name = updateInputDto.Name;
        if(updateInputDto.Description != null) brand.Description = updateInputDto.Description;

        await _brandRepository.Update(brand);

        return _mapper.Map<BrandDto>(brand);
    }
}