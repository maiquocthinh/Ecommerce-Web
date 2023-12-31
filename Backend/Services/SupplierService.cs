using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;
using Backend.Models;
using Backend.Common.Exceptions;

namespace Backend.Services;


public class SupplierService : ISupplierService
{
    private readonly HttpContext _httpContext;
    private readonly IMapper _mapper;
    private readonly ISupplierRepository _supplierRepository;
    private readonly IAddressRepository _addressRepository;

    public SupplierService(IHttpContextAccessor httpContextAccessor, IMapper mapper, ISupplierRepository supplierRepository, IAddressRepository addressRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _mapper = mapper;
        _supplierRepository = supplierRepository;
        _addressRepository = addressRepository;
    }

    public async Task<IEnumerable<SupplierTinyDto>> GetAllSupplier()
    {
        var allSupplier = await _supplierRepository.GetAll();
        return allSupplier.Select(s => _mapper.Map<SupplierTinyDto>(s));   
    }

    public async Task<IQueryable<SupplierDto>> GetListSupplier(SupplierFilterDto filterDto)
    {
        var query = _supplierRepository.GetQueryable().OrderByDescending(s => s.CreatedAt).AsQueryable();

        if (filterDto.Keyword != null)
        {
            query = query.Where(s =>
                s.Name.Contains(filterDto.Keyword) ||
                s.Email.Contains(filterDto.Keyword) ||
                s.PhoneNumber.Contains(filterDto.Keyword)
            );
        }

        return query.Select(supplier => _mapper.Map<SupplierDto>(supplier));
    }

    public async Task<SupplierDetailDto> CreateSupplier(SupplierCreateInputDto createInputDto)
    {
        // check email, phone is already exist
        {
            var supplierOld = await _supplierRepository.GetByEmail(createInputDto.Email);
            if (supplierOld != null) throw new ConflictException("Email is already use by another supplier");
        }
        {
            var supplierOld = await _supplierRepository.GetByPhone(createInputDto.PhoneNumber);
            if (supplierOld != null) throw new ConflictException("PhoneNumber is already use by another supplier");
        }

        // create new supplier
        var address = await _addressRepository.Add(_mapper.Map<Address>(createInputDto.Address));
        var supplier = await _supplierRepository.Add(new Supplier
        {
            Name = createInputDto.Name,
            Email = createInputDto.Email,
            PhoneNumber = createInputDto.PhoneNumber,
            AddressId = address.Id,
        });

        return _mapper.Map<SupplierDetailDto>(supplier);
    }

    public async Task<SupplierDetailDto> GetSupplier(int id)
    {
        var supplier = await _supplierRepository.GetById(id);
        if (supplier == null) throw new NotFoundException("Supplier not found");
        return _mapper.Map<SupplierDetailDto>(supplier);
    }

    public async Task<SupplierDetailDto> UpdateSupplier(int id, SupplierUpdateInputDto updateInputDto)
    {
        var supplier = await _supplierRepository.GetById(id);
        if (supplier == null) throw new NotFoundException("Supplier not found");

        if(updateInputDto.Name != null) supplier.Name = updateInputDto.Name;
        if(updateInputDto.Email != null) supplier.Email = updateInputDto.Email;
        if(updateInputDto.PhoneNumber != null) supplier.PhoneNumber = updateInputDto.PhoneNumber;
        if (updateInputDto.Address != null)
        {
            supplier.Address.SpecificAddress = updateInputDto.Address.SpecificAddress;
            supplier.Address.Wards = updateInputDto.Address.Wards;
            supplier.Address.Districts = updateInputDto.Address.Districts;
            supplier.Address.Province = updateInputDto.Address.Province;
        }

        await _supplierRepository.Update(supplier);

        return _mapper.Map<SupplierDetailDto>(supplier);
    }

    public async Task<bool> DeleteSupplier(int id)
    {
        return await _supplierRepository.Remove(id);
    }
}