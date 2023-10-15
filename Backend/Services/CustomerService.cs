using System.Net;
using AutoMapper;
using Backend.Common.Exceptions;
using Backend.DTOs;
using Backend.Infrastructure.Utils;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;

namespace Backend.Services;

public class CustomerService : ICustomerService
{
    private readonly IMapper _mapper;
    private readonly ICustomerRepository _customerRepository;
    private readonly IShippingAddressRepository _shippingAddressRepository;

    public CustomerService(IMapper mapper, ICustomerRepository customerRepository, IShippingAddressRepository shippingAddressRepository)
    {
        _mapper = mapper;
        _customerRepository = customerRepository;
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
        if (customerProfileUpdateDto.Avatar != null) customer.Avatar = customerProfileUpdateDto.Avatar;

        await _customerRepository.Update(customer);
        return _mapper.Map<CustomerProfileDto>(customer);
    }

    public async Task<IEnumerable<CustomerAddress>> GetAddressList(string? email)
    {
        if (email is null) throw new UnauthorizedException("Please login to continue");
        var addressList = await _shippingAddressRepository.Where(sa => sa.Customer.Email == email);
        if (addressList is null) throw new NotFoundException("Customer not found.");

        return addressList.Select(ad => _mapper.Map<CustomerAddress>(ad)).ToList();
    }
}