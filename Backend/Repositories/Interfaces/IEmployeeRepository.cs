using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IEmployeeRepository : IRepository<Employee>, IRepositoryQueryable<Employee>
{
    Task<Employee?> GetByEmail(string email);
    Task<Employee?> GetByPhone(string phone);
}