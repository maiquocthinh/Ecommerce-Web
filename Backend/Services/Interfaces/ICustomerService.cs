using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface ICustomerService
{
    Task<CustomerProfileDto> GetProfile();
    Task<CustomerProfileDto> UpdateProfile(CustomerProfileUpdateDto customerProfileUpdateDto);
    Task<IEnumerable<ShippingAddressDto>> GetAddressList();
    Task<ShippingAddressDto> CreateAddress(ShippingAddressCreateDto shippingAddressCreateDto);
    Task<ShippingAddressDto> UpdateAddress(int shippingAddressId, ShippingAddressUpdateDto shippingAddressUpdateDto);
    Task DeleteAddress(int shippingAddressId);

    Task<IQueryable<CustomerShortDto>> FilteredCustomer(CustomerFilterDto filterDto);
    Task<CustomerDetailDto> GetCustomerById(int customerId);
    Task<CustomerDetailDto> CreateCustomer(CustomerCreateInputDto createInputDto);
    Task<CustomerDetailDto> UpdateCustomer(int customerId, CustomerUpdateInputDto updateInputDto);
    Task<bool> DeleteCustomer(int customerId);
}