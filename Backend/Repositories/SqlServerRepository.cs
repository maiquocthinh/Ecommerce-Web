using System.Linq.Expressions;
using Backend.Data;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public abstract class SqlServerRepository<T>: IRepository<T> where T : class
{
    private readonly DBContext _context;
    private readonly DbSet<T> _dbSet;
    

    protected SqlServerRepository(DBContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public virtual async Task<T> Add(T obj)
    {
        _dbSet.Add(obj);
        await _context.SaveChangesAsync();
        return obj;
    }

    public virtual async Task<T?> GetById(long id)
    {
        return await _dbSet.FindAsync(id);
    }

    public virtual async Task<IEnumerable<T>> Where(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.Where(predicate).ToListAsync();
    }

    public virtual async Task<IEnumerable<T>> GetAll()
    {
        return await _dbSet.ToListAsync();

    }

    public virtual async Task<T> Update(T obj)
    {
        _dbSet.Attach(obj);
        _context.Entry(obj).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return obj;
    }

    public virtual async Task<bool> Remove(long id)
    {
        var objToDelete = await _dbSet.FindAsync(id);
        if (objToDelete is null) return false;
        _dbSet.Remove(objToDelete);
        await _context.SaveChangesAsync();
        return true;
    }
}