using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class ImportShipmentRepository : SqlServerRepository<ImportShipment>, IImportShipmentRepository
{ 
    public ImportShipmentRepository(DBContext context) : base(context)
    {
    }
}