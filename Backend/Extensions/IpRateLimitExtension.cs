using AspNetCoreRateLimit;
using Backend.Data;
using Newtonsoft.Json;

namespace Backend.Extensions;

public static class IpRateLimitExtension
{
    public static IServiceCollection AddIpRateLimit(this IServiceCollection services)
    {
        services.AddMemoryCache();
        services.Configure<IpRateLimitOptions>(options =>
        {
            options.EnableEndpointRateLimiting = true;
            options.StackBlockedRequests = false;
            options.QuotaExceededResponse = new QuotaExceededResponse
            {
                Content = JsonConvert
                    .SerializeObject(new ErrorResponse { Message = "Request limit exceeded. Try again later." })
                    .Replace("{", "{{")
                    .Replace("}", "}}"),
                ContentType = "application/json"
            };

            options.GeneralRules = new List<RateLimitRule>
            {
                new RateLimitRule
                {
                    Endpoint = "POST:/api/auth/customer/request-reset-password",
                    Period = "2h",
                    Limit = 3,
                }
            };
        });
        services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
        services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
        services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
        services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
        services.AddInMemoryRateLimiting();


        return services;
    }
}