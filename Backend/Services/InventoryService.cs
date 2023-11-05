using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;
using Backend.Models;
using Backend.Common.Exceptions;
using Microsoft.Extensions.Hosting;
using Backend.Infrastructure.Jwt;
using Backend.Repositories;

namespace Backend.Services;


public class InventoryService : IInventoryService
{
    private readonly HttpContext _httpContext;
    private readonly IMapper _mapper;
    private readonly IImportRepository _importRepository;
    private readonly IImportShipmentRepository _importShipmentRepository;
    private readonly IProductVersionRepository _productVersionRepository;
    private readonly IEmployeeRepository _employeeRepository;

    public InventoryService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IImportRepository importRepository, 
        IImportShipmentRepository importShipmentRepository, IProductVersionRepository productVersionRepository, IEmployeeRepository employeeRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _mapper = mapper;
        _importRepository = importRepository;
        _importShipmentRepository = importShipmentRepository;
        _productVersionRepository = productVersionRepository;
        _employeeRepository = employeeRepository;
    }

    public async Task<IQueryable<InventoryDto>> GetAllInventory(InventoryFilterDto filterDto)
    {
        var query = await _productVersionRepository.GetAllProductVeersionIQueryable();

        if (filterDto.Keyword != null)
        {
            query = query.Where(pv => pv.Name.Contains(filterDto.Keyword));
        }

        return query.Select(pv => new InventoryDto
        {
            ProductVersionName = pv.Name,
            Color = pv.Color,
            Inventory = pv.ImportShipments.Sum(ishp => ishp.Quantity),
            IsOutOfStock = pv.ImportShipments.Sum(ishp => ishp.Quantity) <= 0
        });
    }

    public async Task<IQueryable<ImportDto>> GetAllImport()
    {
        return (await _importRepository.GetAllImport()).Select(i => _mapper.Map<ImportDto>(i));
    }

    public async Task<ImportDetailDto> GetImportDetail(int id)
    {
        var import = await _importRepository.GetById(id);
        if (import == null) throw new NotFoundException("Import not found.");
        return _mapper.Map<ImportDetailDto>(import);
    }

    public async Task CreateImport(ImportCreateInputDto createInputDto)
    {
        // validate employee
        int employeeId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.EmployeeId)?.Value);
        var employee = await _employeeRepository.GetById(employeeId);
        if (employee is null) throw new NotFoundException("Employee not found.");

        var import = await _importRepository.Add(new Import
        {
            EmployeeId = employeeId,
            SupplierId = createInputDto.SupplierId,
        });

        await _importShipmentRepository.AddMultiple(createInputDto.ImportShipments.Select(ishp => new ImportShipment
        {
            ImportId = import.Id,
            ProductVersionId = ishp.ProductVersionId,
            Quantity = ishp.Quantity,
            Cost = ishp.Cost,
        }));
    }

    public async Task<IEnumerable<ImportShipmentDto>> GetAllImportShipmentOfProductVersion(int productVersionId)
    {
        var importShipments = await _importShipmentRepository.Where(ishp => ishp.ProductVersionId == productVersionId && ishp.Remaining > 0);
        return importShipments.Select(ishp => _mapper.Map<ImportShipmentDto>(ishp));
    }
}