using Backend.Models;

namespace Backend.Repositories.Interfaces;

public interface IRefreshTokenRepository: IRepository<RefreshToken>
{
    Task<RefreshToken?> GetById(Guid id);
    Task<RefreshToken?> GetByEmployeeId(long employeeId);
    Task<bool> Remove(Guid id);
}