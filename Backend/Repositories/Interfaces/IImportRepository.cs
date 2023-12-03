using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IImportRepository : IRepository<Import>, IRepositoryQueryable<Import>
{
}