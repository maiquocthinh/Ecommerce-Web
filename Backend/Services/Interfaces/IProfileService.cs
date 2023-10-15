using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface IProfileService
{
    Task<CustomerProfileDto> GetCustomerProfile(string? email);
    Task<CustomerProfileDto> UpdateCustomerProfile(string? email, CustomerProfileUpdateDto customerProfileUpdateDto);
}