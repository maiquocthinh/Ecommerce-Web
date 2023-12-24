using Backend.DTOs;
using Backend.Models;
using Backend.Repositories;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using System.Diagnostics;
using System.Globalization;

namespace Backend.Services;

public class DashboardService : IDashboardService
{
    private readonly ICustomerRepository _customerRepo;
    private readonly IEmployeeRepository _employeeRepo;
    private readonly IProductRepository _productRepo;
    private readonly IProductVersionRepository _productVersionRepo;
    private readonly IOrderRepository _orderRepo;
    private readonly IOrderDetailRepository _orderDetailRepo;
    private readonly ISupplierRepository _supplierRepo;
    private readonly IBrandRepository _brandRepo;
    private readonly ICategoryRepository _categoryRepo;
    private readonly INeedRepository _needRepo;

    public DashboardService(ICustomerRepository customerRepo, IEmployeeRepository employeeRepo, IProductRepository productRepo,
        IProductVersionRepository productVersionRepo, IOrderRepository orderRepo, IOrderDetailRepository orderDetailRepo,
        ISupplierRepository supplierRepo, IBrandRepository brandRepo, ICategoryRepository categoryRepo, INeedRepository needRepo)
    {
        _customerRepo = customerRepo;
        _employeeRepo = employeeRepo;
        _productRepo = productRepo;
        _productVersionRepo = productVersionRepo;
        _orderRepo = orderRepo;
        _orderDetailRepo = orderDetailRepo;
        _supplierRepo = supplierRepo;
        _brandRepo = brandRepo;
        _categoryRepo = categoryRepo;
        _needRepo = needRepo;
    }


    public async Task<object> GetParameters()
    {
        DateTime today = DateTime.Today;
        DateTime startOfWeek = today.AddDays(-(int)today.DayOfWeek);
        DateTime startOfLastWeek = startOfWeek.AddDays(-7);

        // Total
        var total = new List<object>
        {
            new { Label = "Customers", Value = (await _customerRepo.GetAll()).Count() },
            new { Label = "Employees", Value = (await _employeeRepo.GetAll()).Count() },
            new { Label = "Products", Value = (await _productRepo.GetAll()).Count() },
            new { Label = "Orders", Value = (await _orderRepo.GetAll()).Count() },
            new { Label = "Suppliers", Value = (await _supplierRepo.GetAll()).Count() },
            new { Label = "Brands", Value = (await _brandRepo.GetAll()).Count() },
            new { Label = "Categories", Value = (await _categoryRepo.GetAll()).Count() },
            new { Label = "Needs", Value = (await _needRepo.GetAll()).Count() }
        };

        // This Week
        var thisWeekOrderList = _orderRepo.GetQueryable()
            .Where(o => o.CreatedAt >= startOfWeek && o.CreatedAt < today)
            .ToList();
        var lastWeekOrderList = _orderRepo.GetQueryable()
            .Where(o => o.CreatedAt >= startOfLastWeek && o.CreatedAt < startOfWeek)
            .ToList();

        // Customers
        var thisWeekCustomer = _customerRepo.GetQueryable()
            .Where(o => o.CreatedAt >= startOfWeek && o.CreatedAt < today)
            .Count();
        var lastWeekCustomer = _customerRepo.GetQueryable()
            .Where(o => o.CreatedAt >= startOfLastWeek && o.CreatedAt < startOfWeek)
            .Count();

        // Orders
        var thisWeekOrder = thisWeekOrderList.Count();
        var lastWeekOrder = lastWeekOrderList.Count();

        // Revenue
        var thisWeekRevenue = thisWeekOrderList
            .Where(o => o.Status == OrderStatus.Shipped)
            .Sum(o => o.TotalPrice);

        var lastWeekRevenue = lastWeekOrderList
            .Where(o => o.Status == OrderStatus.Shipped)
            .Sum(o => o.TotalPrice);

        // Profit
        var thisWeekProfit = thisWeekOrderList
            .Where(o => o.Status == OrderStatus.Shipped)
            .SelectMany(o => o.OrderDetails)
            .Where(od => od.ImportShipment != null)
            .Sum(od => (od.Price - (od.ImportShipment != null ? od.ImportShipment.Cost : 0)) * od.Quantity);

        var lastWeekProfit = lastWeekOrderList
            .Where(o => o.Status == OrderStatus.Shipped)
            .SelectMany(o => o.OrderDetails)
            .Where(od => od.ImportShipment != null)
            .Sum(od => (od.Price - (od.ImportShipment != null ? od.ImportShipment.Cost : 0)) * od.Quantity);


        decimal revenueGrowthPercentage = CalculateGrowthPercentage(lastWeekRevenue, thisWeekRevenue);
        decimal profitGrowthPercentage = CalculateGrowthPercentage(lastWeekProfit, thisWeekProfit);
        decimal orderGrowthPercentage = CalculateGrowthPercentage(lastWeekOrder, thisWeekOrder);
        decimal customerGrowthPercentage = CalculateGrowthPercentage(lastWeekCustomer, thisWeekCustomer);


        return new
        {
            ThisWeek = new object[]
            {
                new  {
                    Title = "Revenue",
                    Value = thisWeekRevenue,
                    GrowthPercent = revenueGrowthPercentage
                },
                new  {
                    Title = "Profit",
                    Value = thisWeekProfit,
                    GrowthPercent = profitGrowthPercentage
                },
                new  {
                    Title = "Orders",
                    Value = thisWeekOrder,
                    GrowthPercent = orderGrowthPercentage
                },
                new  {
                    Title = "Customers",
                    Value = thisWeekCustomer,
                    GrowthPercent = customerGrowthPercentage
                }
            }
            ,
            Total = total,
        };
    }

    public async Task<object> GetBestSellProducts_Table(DashboardFilterDto filterDto)
    {
        var query = _orderDetailRepo.GetQueryable()
            .Where(od => od.Order.Status == OrderStatus.Shipped);

        if (filterDto.StartDate != null)
            query = query.Where(o => o.CreatedAt >= filterDto.StartDate);

        if (filterDto.EndDate != null)
            query = query.Where(o => o.CreatedAt <= filterDto.EndDate);


        var topProducts = query
            .GroupBy(od => od.ProductVersionId)
            .Select(group => new
            {
                ProductVersionId = group.Key,
                TotalQuantitySold = group.Sum(od => od.Quantity)
            })
            .OrderByDescending(result => result.TotalQuantitySold)
            .Take(filterDto.Limit)
            .Join(
                _productVersionRepo.GetQueryable(),
                tsp => tsp.ProductVersionId,
                pv => pv.Id,
                (tsp, pv) => new
                {
                    Id = tsp.ProductVersionId,
                    Name = pv.Name,
                    Price = pv.Price,
                    ImageUrl = pv.ImageUrl,
                    InventoryDto = pv.Inventory,
                    Rating = pv.Product.ReviewsScore,
                    RattingAmount = pv.Reviews.Count(),
                    TotalQuantitySold = tsp.TotalQuantitySold
                })
            .ToList();

        return topProducts;
    }

    public async Task<object> GetTopSellEmployees_Table(DashboardFilterDto filterDto)
    {
        var query = _orderRepo.GetQueryable()
           .Where(od => od.Status == OrderStatus.Shipped);

        if (filterDto.StartDate != null)
            query = query.Where(o => o.CreatedAt >= filterDto.StartDate);

        if (filterDto.EndDate != null)
            query = query.Where(o => o.CreatedAt <= filterDto.EndDate);

        var topEmployees = query
            .GroupBy(o => o.EmployeeId)
            .Select(group => new
            {
                EmployeeId = group.Key,
                TotalOrderSold = group.Count(),
                TotalValueSold = group.Sum(o => o.TotalPrice),
            })
            .OrderByDescending(result => result.TotalOrderSold)
            .Take(filterDto.Limit)
            .Join(
                _employeeRepo.GetQueryable(),
                tse => tse.EmployeeId,
                e => e.Id,
                (tse, e) => new
                {
                    Id = tse.EmployeeId,
                    Name = $"{e.LastName} {e.FirstName}",
                    Gender = e.Gender,
                    AvatarUrl = e.AvatarUrl,
                    TotalOrderSold = tse.TotalOrderSold,
                    TotalValueSold = tse.TotalValueSold,
                })
            .ToList();

        return topEmployees;
    }

    public async Task<object> GetRecentOrders_Table(DashboardFilterDto filterDto)
    {
        var query = _orderRepo.GetQueryable();

        if (filterDto.StartDate != null)
            query = query.Where(o => o.CreatedAt >= filterDto.StartDate);

        if (filterDto.EndDate != null)
            query = query.Where(o => o.CreatedAt <= filterDto.EndDate);

        var recentOrders = query.Take(filterDto.Limit)
            .Select(o => new
            {
                Id = o.Id,
                Date = o.CreatedAt,
                CustomerName = o.Customer != null ? $"{o.Customer.LastName} {o.Customer.FirstName}" : "Anonymous",
                CustomerAvatarUrl = o.Customer != null ? o.Customer.AvatarUrl : "https://i.imgur.com/Th0n214.jpg",
                TotalPrice = o.TotalPrice,
                Status = o.Status,
            })
            .ToList();

        return recentOrders;
    }

    public async Task<object> GetAmountSoldOfCategory_Chart(DashboardFilterDto filterDto)
    {
        var query = _orderDetailRepo.GetQueryable()
            .Where(od => od.Order.Status == OrderStatus.Shipped);

        if (filterDto.StartDate != null)
            query = query.Where(o => o.CreatedAt >= filterDto.StartDate);

        if (filterDto.EndDate != null)
            query = query.Where(o => o.CreatedAt <= filterDto.EndDate);

        var amountSolds = query.GroupBy(od => od.ProductVersion.Product.CategoryId)
            .Select(group => new
            {
                CategoryId = group.Key,
                AmountSold = group.Sum(od => od.Quantity)
            })
            .OrderByDescending(result => result.AmountSold)
            .Join(
                _categoryRepo.GetQueryable(),
                tsctg => tsctg.CategoryId,
                ctg => ctg.Id,
                (tsctg, ctg) => new
                {
                    Name = ctg.Name,
                    Value = tsctg.AmountSold,
                })
            .ToList();


        if (filterDto.Limit < amountSolds.Count())
        {
            var result = amountSolds.Take(filterDto.Limit - 1).ToList();
            int totalAmountSoldOthers = amountSolds.Skip(filterDto.Limit - 1).Sum(item => item.Value);
            result.Add(new { Name = "Others", Value = totalAmountSoldOthers });
            return result;
        }
        else
        {
            var result = amountSolds.Take(filterDto.Limit).ToList();
            return result;
        }
    }

    public async Task<object> GetAmountSoldOfBrand_Chart(DashboardFilterDto filterDto)
    {
        var query = _orderDetailRepo.GetQueryable()
            .Where(od => od.Order.Status == OrderStatus.Shipped);

        if (filterDto.StartDate != null)
            query = query.Where(o => o.CreatedAt >= filterDto.StartDate);

        if (filterDto.EndDate != null)
            query = query.Where(o => o.CreatedAt <= filterDto.EndDate);

        var amountSolds = query.GroupBy(od => od.ProductVersion.Product.BrandId)
            .Select(group => new
            {
                BrandId = group.Key,
                AmountSold = group.Sum(od => od.Quantity)
            })
            .OrderByDescending(result => result.AmountSold)
            .Join(
                _brandRepo.GetQueryable(),
                tsbrd => tsbrd.BrandId,
                brd => brd.Id,
                (tsbrd, brd) => new
                {
                    Name = brd.Name,
                    Value = tsbrd.AmountSold,
                })
            .ToList();


        if (filterDto.Limit < amountSolds.Count())
        {
            var result = amountSolds.Take(filterDto.Limit - 1).ToList();
            int totalAmountSoldOthers = amountSolds.Skip(filterDto.Limit - 1).Sum(item => item.Value);
            result.Add(new { Name = "Others", Value = totalAmountSoldOthers });
            return result;
        }
        else
        {
            var result = amountSolds.Take(filterDto.Limit).ToList();
            return result;
        }
    }

    public async Task<object> GetAmountSoldOfNeed_Chart(DashboardFilterDto filterDto)
    {
        var query = _orderDetailRepo.GetQueryable()
            .Where(od => od.Order.Status == OrderStatus.Shipped);

        if (filterDto.StartDate != null)
            query = query.Where(o => o.CreatedAt >= filterDto.StartDate);

        if (filterDto.EndDate != null)
            query = query.Where(o => o.CreatedAt <= filterDto.EndDate);

        var amountSolds = query.GroupBy(od => od.ProductVersion.Product.NeedId)
            .Select(group => new
            {
                NeedId = group.Key,
                AmountSold = group.Sum(od => od.Quantity)
            })
            .OrderByDescending(result => result.AmountSold)
            .Join(
                _needRepo.GetQueryable(),
                tsn => tsn.NeedId,
                n => n.Id,
                (tsn, n) => new
                {
                    Name = n.Title,
                    Value = tsn.AmountSold,
                })
            .ToList();

        if (filterDto.Limit < amountSolds.Count())
        {
            var result = amountSolds.Take(filterDto.Limit - 1).ToList();
            int totalAmountSoldOthers = amountSolds.Skip(filterDto.Limit - 1).Sum(item => item.Value);
            result.Add(new { Name = "Others", Value = totalAmountSoldOthers });
            return result;
        }
        else
        {
            var result = amountSolds.Take(filterDto.Limit).ToList();
            return result;
        }
    }

    public async Task<object> GetOverview_Chart(DashboardFilterDto filterDto)
    {
        IQueryable<OrderDetail> query = _orderDetailRepo.GetQueryable();
        IQueryable<TinyOrderDetail> tinyQuery;
        IEnumerable<IGrouping<string, TinyOrderDetail>> groupQuery;
        TimeSpan dateDifference;


        if (filterDto.StartDate != null)
            query = query.Where(o => o.CreatedAt >= filterDto.StartDate);

        if (filterDto.EndDate != null)
            query = query.Where(o => o.CreatedAt <= filterDto.EndDate);


        tinyQuery = query.Select(od => new TinyOrderDetail
        {
            Status = od.Order.Status,
            CreatedAt = od.CreatedAt,
            Revenue = od.Price * od.Quantity,
            Profit = (od.Price - (od.ImportShipment != null ? od.ImportShipment.Cost : 0)) * od.Quantity,
        });


        if (filterDto.StartDate != null && filterDto.EndDate == null)
            dateDifference = DateTime.Now - filterDto.StartDate.Value;
        else if (filterDto.StartDate == null && filterDto.EndDate != null)
            dateDifference = filterDto.EndDate.Value - (new DateTime());
        else if (filterDto.StartDate != null && filterDto.EndDate != null)
            dateDifference = filterDto.EndDate.Value - filterDto.StartDate.Value;
        else
            dateDifference = DateTime.Now - (new DateTime());

        if (dateDifference.TotalDays <= 7)
        {
            groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("ddd"));
        }
        else if (dateDifference.TotalDays <= 14)
        {
            groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("dd MMM"));
        }
        else if (dateDifference.TotalDays <= 3 * 7 * 4)
        {
            groupQuery = tinyQuery.AsEnumerable().GroupBy(od => $"Week {ToWeek(od.CreatedAt)}");
        }
        else if (dateDifference.TotalDays <= 20 * 30)
        {
            groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("MMM yyyy"));
        }
        else
        {
            groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("yyyy"));
        }

        var result = groupQuery.Select(group => new
        {
            At = group.Key,
            Orders = group.Count(),
            Revenue = group.Where(tod => tod.Status == OrderStatus.Shipped).Sum(tod => tod.Revenue),
            Profit = group.Where(tod => tod.Status == OrderStatus.Shipped).Sum(tod => tod.Profit),
        });

        return result;
    }

    public async Task<object> GetOrders_Chart(DashboardFilterDto filterDto)
    {
        IQueryable<Order> query = _orderRepo.GetQueryable();
        IEnumerable<IGrouping<string, Order>> groupQuery;
        TimeSpan dateDifference;


        if (filterDto.StartDate != null)
            query = query.Where(o => o.CreatedAt >= filterDto.StartDate);

        if (filterDto.EndDate != null)
            query = query.Where(o => o.CreatedAt <= filterDto.EndDate);


        if (filterDto.StartDate != null && filterDto.EndDate == null)
            dateDifference = DateTime.Now - filterDto.StartDate.Value;
        else if (filterDto.StartDate == null && filterDto.EndDate != null)
            dateDifference = filterDto.EndDate.Value - (new DateTime());
        else if (filterDto.StartDate != null && filterDto.EndDate != null)
            dateDifference = filterDto.EndDate.Value - filterDto.StartDate.Value;
        else
            dateDifference = DateTime.Now - (new DateTime());

        if (dateDifference.TotalDays <= 7)
        {
            groupQuery = query.AsEnumerable().GroupBy(o => o.CreatedAt.ToString("ddd"));
        }
        else if (dateDifference.TotalDays <= 14)
        {
            groupQuery = query.AsEnumerable().GroupBy(o => o.CreatedAt.ToString("dd MMM"));
        }
        else if (dateDifference.TotalDays <= 3 * 7 * 4)
        {
            groupQuery = query.AsEnumerable().GroupBy(o => $"Week {ToWeek(o.CreatedAt)}");
        }
        else if (dateDifference.TotalDays <= 20 * 30)
        {
            groupQuery = query.AsEnumerable().GroupBy(o => o.CreatedAt.ToString("MMM yyyy"));
        }
        else
        {
            groupQuery = query.AsEnumerable().GroupBy(o => o.CreatedAt.ToString("yyyy"));
        }

        var result = groupQuery.Select(group => new
        {
            At = group.Key,
            Processing = group.Where(o => o.Status == OrderStatus.Processing).Count(),
            Delivering = group.Where(o => o.Status == OrderStatus.Delivering).Count(),
            Shipped = group.Where(o => o.Status == OrderStatus.Shipped).Count(),
            Cancelled = group.Where(o => o.Status == OrderStatus.Cancelled).Count(),
        });

        return result;
    }

    public async Task<object> GetRevenueAndProfit_Chart(DashboardFilterDto filterDto)
    {
        IQueryable<OrderDetail> query = _orderDetailRepo.GetQueryable().Where(od => od.Order.Status == OrderStatus.Shipped);
        IQueryable<TinyOrderDetail> tinyQuery;
        IEnumerable<IGrouping<string, TinyOrderDetail>> groupQuery;
        TimeSpan dateDifference;


        if (filterDto.StartDate != null)
            query = query.Where(o => o.CreatedAt >= filterDto.StartDate);

        if (filterDto.EndDate != null)
            query = query.Where(o => o.CreatedAt <= filterDto.EndDate);


        tinyQuery = query.Select(od => new TinyOrderDetail
        {
            CreatedAt = od.CreatedAt,
            Revenue = od.Price * od.Quantity,
            Profit = (od.Price - (od.ImportShipment != null ? od.ImportShipment.Cost : 0)) * od.Quantity,
        });


        if (filterDto.StartDate != null && filterDto.EndDate == null)
            dateDifference = DateTime.Now - filterDto.StartDate.Value;
        else if (filterDto.StartDate == null && filterDto.EndDate != null)
            dateDifference = filterDto.EndDate.Value - (new DateTime());
        else if (filterDto.StartDate != null && filterDto.EndDate != null)
            dateDifference = filterDto.EndDate.Value - filterDto.StartDate.Value;
        else
            dateDifference = DateTime.Now - (new DateTime());

        if (dateDifference.TotalDays <= 7)
        {
            groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("ddd"));
        }
        else if (dateDifference.TotalDays <= 14)
        {
            groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("dd MMM"));
        }
        else if (dateDifference.TotalDays <= 3 * 7 * 4)
        {
            groupQuery = tinyQuery.AsEnumerable().GroupBy(od => $"Week {ToWeek(od.CreatedAt)}");
        }
        else if (dateDifference.TotalDays <= 20 * 30)
        {
            groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("MMM yyyy"));
        }
        else
        {
            groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("yyyy"));
        }

        var result = groupQuery.Select(group => new
        {
            At = group.Key,
                Revenue = group.Sum(tod => tod.Revenue),
            Profit = group.Sum(tod => tod.Profit),
        });

        return result;
    }


    private decimal CalculateGrowthPercentage(decimal lastWeekValue, decimal thisWeekValue)
    {
        return lastWeekValue != 0
            ? decimal.Round(((thisWeekValue - lastWeekValue) / lastWeekValue) * 100, 2, MidpointRounding.AwayFromZero)
            : 100;
    }

    private string ToWeek(DateTime d)
    {
        return CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(d, CalendarWeekRule.FirstDay, DayOfWeek.Monday).ToString();
    }
}

internal class TinyOrderDetail
{
    public string Status { get; set; }
    public int Revenue { get; set; }
    public int Profit { get; set; }
    public DateTime CreatedAt { get; set; }
}