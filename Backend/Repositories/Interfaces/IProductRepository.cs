using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Interfaces;

public interface IProductRepository : IRepository<Product>, IRepositoryQueryable<Product> 
{
}