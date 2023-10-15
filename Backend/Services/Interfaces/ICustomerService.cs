using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface ICustomerService
{
    Task<CustomerProfileDto> GetProfile(string? email);
    Task<CustomerProfileDto> UpdateProfile(string? email, CustomerProfileUpdateDto customerProfileUpdateDto);
    Task<IEnumerable<CustomerAddress>> GetAddressList(string? email);
}