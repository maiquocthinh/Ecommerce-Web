using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IImportRepository : IRepository<Import>
{
    Task<IQueryable<Import>> GetAllImport();
}