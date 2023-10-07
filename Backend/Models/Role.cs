using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Backend.Models;

public partial class Role
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Permissions { get; set; } = "[]";

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    [NotMapped] 
    private List<string>? _permissionList;
    
    [NotMapped] 
    public List<string>? PermissionList
    {
        get
        {
            if (_permissionList is null)
                _permissionList = JsonConvert.DeserializeObject<List<string>>(Permissions);
            return _permissionList;
        }
        set
        {
            _permissionList = value?.Distinct()?.ToList();
            Permissions = JsonConvert.SerializeObject(_permissionList);
        }
    }
}
