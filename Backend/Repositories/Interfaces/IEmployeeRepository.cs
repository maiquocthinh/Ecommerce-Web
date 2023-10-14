using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IEmployeeRepository : IRepository<Employee>
{
    Task<Employee?> GetByEmail(string email);
}