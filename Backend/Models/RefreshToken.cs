using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class RefreshToken
{
    public Guid? Id { get; set; } = null;

    public long EmployeeId { get; set; }

    public string? Token { get; set; } = null;

    public DateTime? ExpiresAt { get; set; } = null;

    public bool Revoked { get; set; } = false;

    public virtual Employee Employee { get; set; } = null!;
}
