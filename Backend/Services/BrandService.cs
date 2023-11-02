using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;

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
}