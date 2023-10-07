using Backend.Models;

namespace Backend.Respositories.Interfaces;

public interface IRefreshTokenRepository: IRepository<RefreshToken>
{
    Task<RefreshToken?> GetById(Guid id);
}