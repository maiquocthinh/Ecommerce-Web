using Backend.Models;

namespace Backend.Respositories.Interfaces;

public interface ICustomerRepository : IRepository<Customer>
{
    Task<Customer?> GetByEmail(string email);
    Task<Customer?> GetByEmailOrPhoneNumber(string? email, string? phoneNumber);
}