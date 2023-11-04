using Backend.DTOs;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IEmployeeService
{
    Task<IQueryable<EmployeeShortDto>> FilteredEmployee(EmployeeFilterDto filterDto);
    Task<EmployeeDetailDto> GetEmployeeById(int id);
    Task<EmployeeDetailDto> CreateEmployee(EmployeeCreateInputDto createInputDto);
    Task<EmployeeDetailDto> UpdateEmployee(int id, EmployeeUpdateInputDto updateInputDto);
    Task<bool> DeleteEmpoyee(int id);
}