using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IBrandRepository : IRepository<Brand>, IRepositoryQueryable<Brand>
{
}