using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class NeedRepository : SqlServerRepository<Need>, INeedRepository
{
    public NeedRepository(DBContext context) : base(context)
    {
    }
}