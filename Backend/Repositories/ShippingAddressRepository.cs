using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;

namespace Backend.Repositories;

public class ShippingAddressRepository : SqlServerRepository<ShippingAddress>, IShippingAddressRepository
{
    public ShippingAddressRepository(DBContext context) : base(context)
    {
    }

}