using System.Reflection;

namespace Backend.Infrastructure.Utils;

public static class Utils
{
    public static bool AreAllPropertiesNull(object obj)
    {
        if (obj is null) return true;

        PropertyInfo[] properties = obj.GetType().GetProperties();

        foreach (PropertyInfo property in properties)
            if (property.GetValue(obj) != null)
                return false;

        return true;
    }

    public static bool ArePropertiesDifferent(object? obj1, object? obj2, bool skipNullValues = false)
    {
        if (obj1 is null || obj2 is null) return false;

        PropertyInfo[] properties1 = obj1.GetType().GetProperties();
        PropertyInfo[] properties2 = obj2.GetType().GetProperties();

        foreach (PropertyInfo property1 in properties1)
        {
            PropertyInfo? property2 = properties2.FirstOrDefault(p =>
                p.Name == property1.Name && p.PropertyType == property1.PropertyType);
            if (property2 != null)
            {
                object? value1 = property1.GetValue(obj1);
                object? value2 = property2.GetValue(obj2);
                if (skipNullValues && (value1 == null || value2 == null)) continue;
                if (!object.Equals(value1, value2)) return true;
            }
        }

        return false;
    }
}