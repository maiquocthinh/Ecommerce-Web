using System.Linq.Expressions;

namespace Backend.Repositories.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T> Add(T obj);
    Task<T?> GetById(int id);
    Task<IEnumerable<T>> Where(Expression<Func<T, bool>> predicate);
    Task<IEnumerable<T>> GetAll();
    Task<T> Update(T obj);
    Task<bool> Remove(int id);
}