namespace Backend.Repositories.Interfaces;

public interface IRepositoryQueryable<T> where T : class
{
    IQueryable<T> GetQueryable();
}