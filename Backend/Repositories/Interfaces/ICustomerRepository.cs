using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface ICustomerRepository : IRepository<Customer>
{
    Task<Customer?> GetByEmail(string email);
    Task<Customer?> GetByPhone(string phoneNumber);
    Task<Customer?> GetByEmailOrPhoneNumber(string? email, string? phoneNumber);
    Task<IQueryable<Customer>> FilteredCustomer(CustomerFilterDto filterDto);
}