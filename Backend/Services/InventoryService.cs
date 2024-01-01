using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;
using Backend.Models;
using Backend.Common.Exceptions;
using Backend.Infrastructure.Jwt;

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

    public async Task<IQueryable<InventoryDto>> GetListInventory(InventoryFilterDto filterDto)
    {
        var query = _productVersionRepository.GetQueryable().OrderByDescending(pv => pv.CreatedAt).AsQueryable();

        if (filterDto.Keyword != null)
        {
            query = query.Where(pv => pv.Name.Contains(filterDto.Keyword));
        }

        if (filterDto.IsOutOfStock != null)
        {
            if (filterDto.IsOutOfStock.Value)
                query = query.Where(pv => pv.ImportShipments.Sum(ishp => ishp.Remaining) <= 0);
            else
                query = query.Where(pv => pv.ImportShipments.Sum(ishp => ishp.Remaining) > 0);
        }

        return query.Select(pv => new InventoryDto
        {
            ProductVersionId = pv.Id,
            ProductVersionName = pv.Name,
            ImageUrl = pv.ImageUrl,
            Color = pv.Color,
            Inventory = pv.ImportShipments.Sum(ishp => ishp.Remaining),
            IsOutOfStock = pv.ImportShipments.Sum(ishp => ishp.Remaining) <= 0,
            Price = pv.Price,
        });
    }

    public async Task<IQueryable<ImportDto>> GetListImport()
    {
        var query = _importRepository.GetQueryable().OrderByDescending(i => i.CreatedAt).AsQueryable();

        return query.Select(i => _mapper.Map<ImportDto>(i));
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
            Remaining = ishp.Quantity,
            Cost = ishp.Cost,
        }));
    }

    public async Task<IEnumerable<ImportShipmentDto>> GetAllImportShipmentOfProductVersion(int productVersionId)
    {
        var importShipments = await _importShipmentRepository.Where(ishp => ishp.ProductVersionId == productVersionId && ishp.Remaining > 0);
        return importShipments.Select(ishp => _mapper.Map<ImportShipmentDto>(ishp));
    }
}