using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface ICustomerService
{
    Task<CustomerProfileDto> GetProfile();
    Task<CustomerProfileDto> UpdateProfile(CustomerProfileUpdateDto customerProfileUpdateDto);
    Task<IEnumerable<ShippingAddressDto>> GetAddressList();
    Task<ShippingAddressDto> CreateAddress(ShippingAddressCreateDto shippingAddressCreateDto);
    Task<ShippingAddressDto> UpdateAddress(int shippingAddressId, ShippingAddressUpdateDto shippingAddressUpdateDto);
    Task DeleteAddress(int shippingAddressId);
}