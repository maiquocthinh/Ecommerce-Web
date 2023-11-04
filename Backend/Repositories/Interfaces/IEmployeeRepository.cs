using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IEmployeeRepository : IRepository<Employee>
{
    Task<Employee?> GetByEmail(string email);
    Task<Employee?> GetByPhone(string phone);
    Task<IQueryable<Employee>> FilteredEmployee(EmployeeFilterDto filterDto);
}