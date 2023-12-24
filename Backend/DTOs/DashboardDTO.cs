namespace Backend.DTOs;

// Input DTO
public class DashboardFilterDto
{
    public int Limit { get; set; } = 8;

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }
}
