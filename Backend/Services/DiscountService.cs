using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;
using Backend.Models;
using Backend.Common.Exceptions;
using Backend.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;


public class DiscountService : IDiscountService
{
    private readonly IMapper _mapper;
    private readonly IDiscountRepository _discountRepository;

    public DiscountService(IMapper mapper, IDiscountRepository discountRepository)
    {
        _mapper = mapper;
        _discountRepository = discountRepository;
    }

    public async Task<DiscountDTO> CreateDiscount(DiscountCreateInputDto createInputDto)
    {
        try
        {
            var discount = await _discountRepository.Add(_mapper.Map<Discount>(createInputDto));
            return _mapper.Map<DiscountDTO>(discount);
        }
        catch (DbUpdateException e)
        {
            if (e.InnerException is SqlException sqlException)
                foreach (SqlError error in sqlException.Errors)
                    if (error.Number == 50000)
                        throw new BadRequestException(error.Message);
        }
        return null;
    }

    public async Task<bool> DeleteDiscount(int discountId)
    {
        return await _discountRepository.Remove(discountId);
    }

    public async Task<IQueryable<DiscountDTO>> FilterdDiscount(DiscountFilterDto filterDto)
    {
        var query = await _discountRepository.GetFilterdDiscount(filterDto);

        return query.Select(d=> _mapper.Map<DiscountDTO>(d));   
    }

    public async Task<DiscountDTO> GetDiscountById(int discountId)
    {
        var discount =  await _discountRepository.GetById(discountId);
        if (discount == null) throw new NotFoundException("Discount not found.");
        return _mapper.Map<DiscountDTO>(discount);
    }

    public async Task<DiscountDTO> UpdateDiscount(int discountId, DiscountUpdateInputDto updateInputDto)
    {
        var discount = await _discountRepository.GetById(discountId);
        if (discount == null) throw new NotFoundException("Discount not found.");

        if (updateInputDto.ProductId != null) discount.ProductId = (int)updateInputDto.ProductId;
        if (updateInputDto.DiscountPercent != null) discount.DiscountPercent = updateInputDto.DiscountPercent;
        if (updateInputDto.StartDate != null) discount.StartDate = (DateTime)updateInputDto.StartDate;
        if (updateInputDto.EndDate != null) discount.EndDate = (DateTime)updateInputDto.EndDate;
        if (updateInputDto.Quantity != null) discount.Quantity = (int)updateInputDto.Quantity;
        if (updateInputDto.Active != null) discount.Active = updateInputDto.Active;

        try
        {
            await _discountRepository.Update(discount);
            return _mapper.Map<DiscountDTO>(discount);
        }
        catch (DbUpdateException e)
        {
            if (e.InnerException is SqlException sqlException)
                foreach (SqlError error in sqlException.Errors)
                    if (error.Number == 50000)
                        throw new BadRequestException(error.Message);
        }
        return null;
    }
}