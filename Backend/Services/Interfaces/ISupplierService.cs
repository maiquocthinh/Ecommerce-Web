using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface ISupplierService
{
    Task<IQueryable<SupplierDto>> FilteredSupplier(SupplierFilterDto filterDto);
    Task<SupplierDto> GetSupplier(int id);
    Task<SupplierDto> CreateSupplier(SupplierCreateInputDto createInputDto);
    Task<SupplierDto> UpdateSupplier(int id, SupplierUpdateInputDto updateInputDto);
    Task<bool> DeleteSupplier(int id);
}