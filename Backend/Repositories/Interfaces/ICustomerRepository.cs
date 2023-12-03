using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface ICustomerRepository : IRepository<Customer>, IRepositoryQueryable<Customer>
{
    Task<Customer?> GetByEmail(string email);
    Task<Customer?> GetByPhone(string phoneNumber);
    Task<Customer?> GetByEmailOrPhoneNumber(string? email, string? phoneNumber);
}