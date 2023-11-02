using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Jwt;
using Backend.Repositories;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;

namespace Backend.Services;


public class CategoryService : ICategoryService
{
    private readonly HttpContext _httpContext;
    private readonly IMapper _mapper;
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(IHttpContextAccessor httpContextAccessor, IMapper mapper, ICategoryRepository categoryRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _mapper = mapper;
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategory()
    {
        var categories = await _categoryRepository.GetAll();

        return categories.Select(c => _mapper.Map<CategoryDto>(c));
    }
}