using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;
using Backend.Models;
using Backend.Common.Exceptions;

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

    public async Task<IQueryable<NeedDto>> GetListNeed(NeedFilterDto filterDto)
    {
        var query = _needRepository.GetQueryable().OrderByDescending(c => c.CreatedAt).AsQueryable();

        if (filterDto.NeedTitle != null)
        {
            query = query.Where(n => n.Title.Contains(filterDto.NeedTitle));
        }

        return query.Select(n => _mapper.Map<NeedDto>(n));
    }

    public async Task<NeedDto> CreateNeed(NeedCreateInputDto createInputDto)
    {
        var need = await _needRepository.Add(_mapper.Map<Need>(createInputDto));
        return _mapper.Map<NeedDto>(need);
    }

    public async Task<bool> DeleteNeed(int id)
    {
        return await _needRepository.Remove(id);
    }

    public async Task<NeedDto> GetNeed(int id)
    {
        var need = await _needRepository.GetById(id);
        if (need == null) throw new NotFoundException("Need not found.");
        return _mapper.Map<NeedDto>(need);
    }

    public async Task<NeedDto> UpdateNeed(int id, NeedUpdateInputDto updateInputDto)
    {
        var need = await _needRepository.GetById(id);
        if (need == null) throw new NotFoundException("Need not found.");

        if (updateInputDto.Title != null) need.Title = updateInputDto.Title;
        if (updateInputDto.Description != null) need.Description = updateInputDto.Description;

        await _needRepository.Update(need);

        return _mapper.Map<NeedDto>(need);
    }
}