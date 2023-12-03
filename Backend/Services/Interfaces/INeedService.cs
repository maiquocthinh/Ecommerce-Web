using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface INeedService
{
    Task<IEnumerable<NeedDto>> GetAllNeed();
    Task<IQueryable<NeedDto>> GetListNeed(NeedFilterDto filterDto);
    Task<NeedDto> GetNeed(int id);
    Task<NeedDto> CreateNeed(NeedCreateInputDto createInputDto);
    Task<NeedDto> UpdateNeed(int id, NeedUpdateInputDto updateInputDto);
    Task<bool> DeleteNeed(int id);
}