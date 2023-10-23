using System.Net;
using AutoMapper;
using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Utils;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class CustomerService : ICustomerService
{
    private readonly IMapper _mapper;
    private readonly ICustomerRepository _customerRepository;
    private readonly IAddressRepository _addressRepository;
    private readonly IShippingAddressRepository _shippingAddressRepository;

    public CustomerService(IMapper mapper, ICustomerRepository customerRepository, IAddressRepository addressRepository, IShippingAddressRepository shippingAddressRepository)
    {
        _mapper = mapper;
        _customerRepository = customerRepository;
        _addressRepository = addressRepository;
        _shippingAddressRepository = shippingAddressRepository;
    }

    public async Task<CustomerProfileDto> GetProfile(string? email)
    {
        if (email is null) throw new UnauthorizedException("Please login to continue");
        var customer = await _customerRepository.GetByEmail(email);
        if (customer is null) throw new NotFoundException("Customer not found.");

        return _mapper.Map<CustomerProfileDto>(customer);
    }

    public async Task<CustomerProfileDto> UpdateProfile(string? email,
        CustomerProfileUpdateDto customerProfileUpdateDto)
    {
        // check all properties of customerProfileUpdateDto are null? if all is null => not update
        if (Utils.AreAllPropertiesNull(customerProfileUpdateDto))
            throw new CustomHttpException(statusCode: HttpStatusCode.OK, message: "Not thing update.");

        if (email is null) throw new UnauthorizedException("Please login to continue");
        var customer = await _customerRepository.GetByEmail(email);
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

    public async Task<IEnumerable<ShippingAddressDto>> GetAddressList(string? email)
    {
        if (email is null) throw new UnauthorizedException("Please login to continue");
        var shippingAddressList = await _shippingAddressRepository.Where(sa => sa.Customer.Email == email);

        return shippingAddressList.Select(ad => _mapper.Map<ShippingAddressDto>(ad)).ToList();
    }

    public async Task<ShippingAddressDto> CreateAddress(string? email, ShippingAddressCreateDto shippingAddressCreateDto)
    {
        if (email is null) throw new UnauthorizedException("Please login to continue");
        var customer = await _customerRepository.GetByEmail(email);
        if (customer is null) throw new NotFoundException("Customer not found.");
        var newAddress = await _addressRepository.Add(_mapper.Map<Address>(shippingAddressCreateDto));
        var newShippingAddress = await _shippingAddressRepository.Add(new ShippingAddress
        {
            CustomerId = (int)customer.Id!,
            AddressId = newAddress.Id,
            RecipientName = shippingAddressCreateDto.RecipientName,
            PhoneNumber = shippingAddressCreateDto.PhoneNumber,
            IsDefault = shippingAddressCreateDto.IsDefault
        });

        return _mapper.Map<ShippingAddressDto>(newShippingAddress);
    }

    public async Task<ShippingAddressDto> UpdateAddress(string? email, int shippingAddressId, ShippingAddressUpdateDto shippingAddressUpdateDto)
    {
        if (email is null) throw new UnauthorizedException("Please login to continue");
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

    public async Task DeleteAddress(string? email, int shippingAddressId)
    {
        if (email is null) throw new UnauthorizedException("Please login to continue");
        var shippingAddress = await _shippingAddressRepository.GetById(shippingAddressId);
        if (shippingAddress == null) throw new NotFoundException("Shipping address not found.");
        await _shippingAddressRepository.Remove(shippingAddressId);
    }
}