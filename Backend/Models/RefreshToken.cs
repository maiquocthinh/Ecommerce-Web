using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class RefreshToken
{
    public Guid Id { get; set; }

    public long EmployeeId { get; set; }

    public string Token { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }

    public bool Revoked { get; set; }

    public virtual Employee Employee { get; set; } = null!;
}
