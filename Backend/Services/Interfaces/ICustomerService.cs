using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface ICustomerService
{
    Task<CustomerProfileDto> GetProfile(string? email);
    Task<CustomerProfileDto> UpdateProfile(string? email, CustomerProfileUpdateDto customerProfileUpdateDto);
    Task<IEnumerable<ShippingAddressDto>> GetAddressList(string? email);
    Task<ShippingAddressDto> CreateAddress(string? email, ShippingAddressCreateDto shippingAddressCreateDto);
    Task<ShippingAddressDto> UpdateAddress(string? email, int shippingAddressId, ShippingAddressUpdateDto shippingAddressUpdateDto);
    Task DeleteAddress(string? email, int shippingAddressId);
}