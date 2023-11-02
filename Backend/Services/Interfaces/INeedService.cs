using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface INeedService
{
    Task<IEnumerable<NeedDto>> GetAllNeed();
}