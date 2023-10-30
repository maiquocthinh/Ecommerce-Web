using System.Net;
using AutoMapper;
using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Jwt;
using Backend.Infrastructure.Utils;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class CustomerService : ICustomerService
{
    private readonly HttpContext _httpContext;
    private readonly IMapper _mapper;
    private readonly ICustomerRepository _customerRepository;
    private readonly IAddressRepository _addressRepository;
    private readonly IShippingAddressRepository _shippingAddressRepository;

    public CustomerService(IHttpContextAccessor httpContextAccessor, IMapper mapper, ICustomerRepository customerRepository, IAddressRepository addressRepository, IShippingAddressRepository shippingAddressRepository)
    {
        _httpContext = httpContextAccessor.HttpContext;
        _mapper = mapper;
        _customerRepository = customerRepository;
        _addressRepository = addressRepository;
        _shippingAddressRepository = shippingAddressRepository;
    }

    public async Task<CustomerProfileDto> GetProfile()
    {
        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        return _mapper.Map<CustomerProfileDto>(customer);
    }

    public async Task<CustomerProfileDto> UpdateProfile(CustomerProfileUpdateDto customerProfileUpdateDto)
    {
        // check all properties of customerProfileUpdateDto are null? if all is null => not update
        if (Utils.AreAllPropertiesNull(customerProfileUpdateDto))
            throw new CustomHttpException(statusCode: HttpStatusCode.OK, message: "Not thing update.");

        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        // check common properties of customerProfileUpdateDto and customer are different?
        // if common properties not different => not update
        if (!Utils.ArePropertiesDifferent(customer, customerProfileUpdateDto, true))
            throw new CustomHttpException(statusCode: HttpStatusCode.OK, message: "Not thing update.");

        if (customerProfileUpdateDto.FirstName != null) customer.FirstName = customerProfileUpdateDto.FirstName;
        if (customerProfileUpdateDto.LastName != null) customer.LastName = customerProfileUpdateDto.LastName;
        if (customerProfileUpdateDto.Gender != null) customer.Gender = (bool)customerProfileUpdateDto.Gender;
        if (customerProfileUpdateDto.DayOfBirth != null) customer.DayOfBirth = customerProfileUpdateDto.DayOfBirth;
        if (customerProfileUpdateDto.Email != null) customer.Email = customerProfileUpdateDto.Email;
        if (customerProfileUpdateDto.PhoneNumber != null) customer.PhoneNumber = customerProfileUpdateDto.PhoneNumber;
        if (customerProfileUpdateDto.AvatarUrl != null) customer.AvatarUrl = customerProfileUpdateDto.AvatarUrl;

        await _customerRepository.Update(customer);
        return _mapper.Map<CustomerProfileDto>(customer);
    }

    public async Task<IEnumerable<ShippingAddressDto>> GetAddressList()
    {
        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        var shippingAddressList = await _shippingAddressRepository.Where(sa => sa.CustomerId == customerId);

        return shippingAddressList.Select(ad => _mapper.Map<ShippingAddressDto>(ad)).ToList();
    }

    public async Task<ShippingAddressDto> CreateAddress(ShippingAddressCreateDto shippingAddressCreateDto)
    {
        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        var newAddress = await _addressRepository.Add(_mapper.Map<Address>(shippingAddressCreateDto));
        var newShippingAddress = await _shippingAddressRepository.Add(new ShippingAddress
        {
            CustomerId = customerId,
            AddressId = newAddress.Id,
            RecipientName = shippingAddressCreateDto.RecipientName,
            PhoneNumber = shippingAddressCreateDto.PhoneNumber,
            IsDefault = shippingAddressCreateDto.IsDefault
        });

        return _mapper.Map<ShippingAddressDto>(newShippingAddress);
    }

    public async Task<ShippingAddressDto> UpdateAddress(int shippingAddressId, ShippingAddressUpdateDto shippingAddressUpdateDto)
    {
        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        var shippingAddress = await _shippingAddressRepository.GetById(shippingAddressId);
        if (shippingAddress == null) throw new NotFoundException("Shipping address not found.");

        if (shippingAddressUpdateDto.SpecificAddress != null) shippingAddress.Address.SpecificAddress = shippingAddressUpdateDto.SpecificAddress;
        if (shippingAddressUpdateDto.Province != null) shippingAddress.Address.Province = shippingAddressUpdateDto.Province;
        if (shippingAddressUpdateDto.Districts != null) shippingAddress.Address.Districts = shippingAddressUpdateDto.Districts;
        if (shippingAddressUpdateDto.Wards != null) shippingAddress.Address.Wards = shippingAddressUpdateDto.Wards;
        if (shippingAddressUpdateDto.RecipientName != null) shippingAddress.RecipientName = shippingAddressUpdateDto.RecipientName;
        if (shippingAddressUpdateDto.PhoneNumber != null) shippingAddress.PhoneNumber = shippingAddressUpdateDto.PhoneNumber;
        if (shippingAddressUpdateDto.IsDefault != null) shippingAddress.IsDefault = shippingAddressUpdateDto.IsDefault;

        try
        {
            await _shippingAddressRepository.Update(shippingAddress);
        }
        catch (DbUpdateException e)
        {
            if (e.InnerException is SqlException sqlException)
                foreach (SqlError error in sqlException.Errors)
                    if (error.Number == 50000)
                        throw new BadRequestException(error.Message);
        }

        return _mapper.Map<ShippingAddressDto>(shippingAddress);
    }

    public async Task DeleteAddress(int shippingAddressId)
    {
        int customerId = int.Parse(_httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.CustomerId)?.Value);
        var customer = await _customerRepository.GetById(customerId);
        if (customer is null) throw new NotFoundException("Customer not found.");

        var shippingAddress = await _shippingAddressRepository.GetById(shippingAddressId);
        if (shippingAddress == null) throw new NotFoundException("Shipping address not found.");

        try
        {
            await _shippingAddressRepository.Remove(shippingAddressId);
        }
        catch (DbUpdateException e)
        {
            if (e.InnerException is SqlException sqlException)
                foreach (SqlError error in sqlException.Errors)
                    if (error.Number == 50000)
                        throw new BadRequestException(error.Message);
        }
    }
}