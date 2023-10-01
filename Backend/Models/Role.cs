using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Role
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Permissions { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
