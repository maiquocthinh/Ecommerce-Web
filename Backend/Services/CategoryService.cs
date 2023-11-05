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

    public async Task<IQueryable<CategoryDto>> FilteredCategory(CategoryFilterDto filterDto)
    {
        return (await _categoryRepository.FilteredCategory(filterDto)).Select(c => _mapper.Map<CategoryDto>(c));
    }

    public async Task<CategoryDto> CreateCategory(CategoryCreateInputDto createInputDto)
    {
        var category = await _categoryRepository.Add(_mapper.Map<Category>(createInputDto));
        return _mapper.Map<CategoryDto>(category);
    }

    public async Task<bool> DeleteCategory(int id)
    {
        return await _categoryRepository.Remove(id);
    }

    public async Task<CategoryDto> GetCategory(int id)
    {
        var category = await _categoryRepository.GetById(id);
        if (category == null) throw new NotFoundException("Category not found");
        return _mapper.Map<CategoryDto>(category);
    }

    public async Task<CategoryDto> UpdateCategory(int id, CategoryUpdateInputDto updateInputDto)
    {
        var category = await _categoryRepository.GetById(id);
        if (category == null) throw new NotFoundException("Category not found");

        if(updateInputDto.Name != null) category.Name = updateInputDto.Name;
        if (updateInputDto.Description != null) category.Description = updateInputDto.Description;

        await _categoryRepository.Update(category);

        return _mapper.Map<CategoryDto>(category);
    }
}