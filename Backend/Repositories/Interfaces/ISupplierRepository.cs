using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface ISupplierRepository : IRepository<Supplier>, IRepositoryQueryable<Supplier>
{
    Task<Supplier> GetByEmail(string email);
    Task<Supplier> GetByPhone(string phone);
}