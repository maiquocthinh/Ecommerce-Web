using Backend.DTOs;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using AutoMapper;
using Backend.Models;
using Backend.Common.Exceptions;
using Backend.Infrastructure.Jwt;

namespace Backend.Services;


public class EmployeeService : IEmployeeService
{
    private readonly HttpContext _httpContext;
    private readonly IMapper _mapper;
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IAddressRepository _addressRepository;

    public EmployeeService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IEmployeeRepository employeeRepository, IAddressRepository addressRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _mapper = mapper;
        _employeeRepository = employeeRepository;
        _addressRepository = addressRepository;
    }

    public async Task<EmployeeDetailDto> GetEmployeeProfile()
    {
        // validate employee
        int employeeId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.EmployeeId)?.Value);
        var employee = await _employeeRepository.GetById(employeeId);
        if (employee is null) throw new NotFoundException("Employee not found.");

        return _mapper.Map<EmployeeDetailDto>(employee);
    }

    public async Task<EmployeeDetailDto> UpdateEmployeeProfile(EmployeeUpdateInputDto updateInputDto)
    {
        // validate employee
        int employeeId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.EmployeeId)?.Value);
        var employee = await _employeeRepository.GetById(employeeId);
        if (employee is null) throw new NotFoundException("Employee not found.");

        if (updateInputDto.FirstName != null) employee.FirstName = updateInputDto.FirstName;
        if (updateInputDto.LastName != null) employee.LastName = updateInputDto.LastName;
        if (updateInputDto.Gender != null) employee.Gender = (bool)updateInputDto.Gender;
        if (updateInputDto.DayOfBirth != null) employee.DayOfBirth = (DateTime)updateInputDto.DayOfBirth;
        if (updateInputDto.Email != null) employee.Email = updateInputDto.Email;
        if (updateInputDto.PhoneNumber != null) employee.PhoneNumber = updateInputDto.PhoneNumber;
        if (updateInputDto.Password != null) employee.HashedPassword = BCrypt.Net.BCrypt.HashPassword(updateInputDto.Password);
        if (updateInputDto.AvatarUrl != null) employee.AvatarUrl = updateInputDto.AvatarUrl;
        if (updateInputDto.Active != null) employee.Active = (bool)updateInputDto.Active;
        if (updateInputDto.RoleId != null) employee.RoleId = (int)updateInputDto.RoleId;
        if (updateInputDto.Address != null)
        {
            employee.Address.SpecificAddress = updateInputDto.Address.SpecificAddress;
            employee.Address.Wards = updateInputDto.Address.Wards;
            employee.Address.Districts = updateInputDto.Address.Districts;
            employee.Address.Province = updateInputDto.Address.Province;
        }

        await _employeeRepository.Update(employee);

        return _mapper.Map<EmployeeDetailDto>(employee);
    }

    public async Task<EmployeeDetailDto> CreateEmployee(EmployeeCreateInputDto createInputDto)
    {
        // check email, phone is already exist
        {
            var employeeOld = await _employeeRepository.GetByEmail(createInputDto.Email);
            if (employeeOld != null) throw new ConflictException("Email is already use by another employee");
        }
        {
            var employeeOld = await _employeeRepository.GetByPhone(createInputDto.PhoneNumber);
            if (employeeOld != null) throw new ConflictException("PhoneNumber is already use by another employee");
        }

        // create new employee
        var address = await _addressRepository.Add(_mapper.Map<Address>(createInputDto.Address));
        var employee = await _employeeRepository.Add(new Employee
        {
            FirstName = createInputDto.FirstName,
            LastName = createInputDto.LastName,
            Gender = (bool)createInputDto.Gender,
            DayOfBirth = (DateTime)createInputDto.DayOfBirth,
            Email = createInputDto.Email,
            PhoneNumber = createInputDto.PhoneNumber,
            HashedPassword = BCrypt.Net.BCrypt.HashPassword(createInputDto.Password),
            AvatarUrl = createInputDto.AvatarUrl,
            Active = createInputDto.Active,
            AddressId = address.Id,
            RoleId = (int)createInputDto.RoleId
        });

        return _mapper.Map<EmployeeDetailDto>(employee);
    }

    public async Task<bool> DeleteEmpoyee(int id)
    {
        return await _employeeRepository.Remove(id);
    }

    public async Task<IQueryable<EmployeeShortDto>> GetListEmployee(EmployeeFilterDto filterDto)
    {
        var query = _employeeRepository.GetQueryable().OrderByDescending(e => e.CreatedAt).AsQueryable();
        {
            if (filterDto.Keyword != null)
            {
                query = query.Where(e =>
                    e.FirstName.Contains(filterDto.Keyword) ||
                    e.LastName.Contains(filterDto.Keyword) ||
                    e.Email.Contains(filterDto.Keyword) ||
                    e.PhoneNumber.Contains(filterDto.Keyword)
                );
            }

            if (filterDto.RoleId != null)
            {
                query = query.Where(e => e.RoleId == filterDto.RoleId);
            }
        }

        return query.Select(e => _mapper.Map<EmployeeShortDto>(e));
    }

    public async Task<EmployeeDetailDto> GetEmployeeById(int id)
    {
        var employee = await _employeeRepository.GetById(id);
        if (employee == null) throw new NotFoundException("Employee is not found.");

        return _mapper.Map<EmployeeDetailDto>(employee);
    }

    public async Task<EmployeeDetailDto> UpdateEmployee(int id, EmployeeUpdateInputDto updateInputDto)
    {
        var employee = await _employeeRepository.GetById(id);
        if (employee == null) throw new NotFoundException("Employee is not found.");

        if (updateInputDto.FirstName != null) employee.FirstName = updateInputDto.FirstName;
        if (updateInputDto.LastName != null) employee.LastName = updateInputDto.LastName;
        if (updateInputDto.Gender != null) employee.Gender = (bool)updateInputDto.Gender;
        if (updateInputDto.DayOfBirth != null) employee.DayOfBirth = (DateTime)updateInputDto.DayOfBirth;
        if (updateInputDto.Email != null) employee.Email = updateInputDto.Email;
        if (updateInputDto.PhoneNumber != null) employee.PhoneNumber = updateInputDto.PhoneNumber;
        if (updateInputDto.Password != null) employee.HashedPassword = BCrypt.Net.BCrypt.HashPassword(updateInputDto.Password);
        if (updateInputDto.AvatarUrl != null) employee.AvatarUrl = updateInputDto.AvatarUrl;
        if (updateInputDto.Active != null) employee.Active = (bool)updateInputDto.Active;
        if (updateInputDto.RoleId != null) employee.RoleId = (int)updateInputDto.RoleId;
        if(updateInputDto.Address != null)
        {
            employee.Address.SpecificAddress = updateInputDto.Address.SpecificAddress;
            employee.Address.Wards = updateInputDto.Address.Wards;
            employee.Address.Districts = updateInputDto.Address.Districts;
            employee.Address.Province = updateInputDto.Address.Province;
        }

        await _employeeRepository.Update(employee);

        return _mapper.Map<EmployeeDetailDto>(employee);
    }

}