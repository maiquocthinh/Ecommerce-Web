using Backend.DTOs;

namespace Backend.Services.Interfaces;

public interface IDashboardService
{
    Task<object> GetParameters();
    Task<object> GetRecentOrders_Table(DashboardFilterDto filterDto);
    Task<object> GetBestSellProducts_Table(DashboardFilterDto filterDto);
    Task<object> GetTopSellEmployees_Table(DashboardFilterDto filterDto);
    Task<object> GetAmountSoldOfCategory_Chart(DashboardFilterDto filterDto);
    Task<object> GetAmountSoldOfBrand_Chart(DashboardFilterDto filterDto);
    Task<object> GetAmountSoldOfNeed_Chart(DashboardFilterDto filterDto);
    Task<object> GetOverview_Chart(DashboardFilterDto filterDto);
    Task<object> GetOrders_Chart(DashboardFilterDto filterDto);
    Task<object> GetRevenueAndProfit_Chart(DashboardFilterDto filterDto);
}