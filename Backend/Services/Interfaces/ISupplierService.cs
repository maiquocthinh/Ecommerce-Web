using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface ISupplierService
{
    Task<IEnumerable<SupplierTinyDto>> GetAllSupplier();
    Task<IQueryable<SupplierDto>> GetListSupplier(SupplierFilterDto filterDto);
    Task<SupplierDetailDto> GetSupplier(int id);
    Task<SupplierDetailDto> CreateSupplier(SupplierCreateInputDto createInputDto);
    Task<SupplierDetailDto> UpdateSupplier(int id, SupplierUpdateInputDto updateInputDto);
    Task<bool> DeleteSupplier(int id);
}