using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface ICustomerRepository : IRepository<Customer>
{
    Task<Customer?> GetByEmail(string email);
    Task<Customer?> GetByEmailOrPhoneNumber(string? email, string? phoneNumber);
}