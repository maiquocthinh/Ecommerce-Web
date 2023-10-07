using System.Linq.Expressions;

namespace Backend.Respositories.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T> Add(T obj);
    Task<T?> GetById(long id);
    Task<IEnumerable<T>> Where(Expression<Func<T, bool>> predicate);
    Task<IEnumerable<T>> GetAll();
    Task<T> Update(long id, T obj);
    Task<bool> Remove(long id);
}