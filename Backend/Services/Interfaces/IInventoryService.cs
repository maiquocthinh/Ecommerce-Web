using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IInventoryService
{
    Task<IQueryable<InventoryDto>> GetListInventory(InventoryFilterDto filterDto);
    Task<IQueryable<ImportDto>> GetListImport();
    Task<ImportDetailDto> GetImportDetail(int id);
    Task CreateImport(ImportCreateInputDto createInputDto);
    Task<IEnumerable<ImportShipmentDto>> GetAllImportShipmentOfProductVersion(int productVersionId);
}