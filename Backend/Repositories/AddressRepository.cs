using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;

namespace Backend.Repositories;

public class AddressRepository : SqlServerRepository<Address>, IAddressRepository
{
    public AddressRepository(DBContext context) : base(context)
    {
    }
}