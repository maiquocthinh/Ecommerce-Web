using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;

namespace Backend.Services;


public class NeedService : INeedService
{
    private readonly HttpContext _httpContext;
    private readonly IMapper _mapper;
    private readonly INeedRepository _needRepository;

    public NeedService(IHttpContextAccessor httpContextAccessor, IMapper mapper, INeedRepository needRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _mapper = mapper;
        _needRepository = needRepository;
    }

    public async Task<IEnumerable<NeedDto>> GetAllNeed()
    {
        var needs = await _needRepository.GetAll();
        return needs.Select(n => _mapper.Map<NeedDto>(n));
    }
}