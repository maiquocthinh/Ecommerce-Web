using System.Text;
using Backend.Authorization.PolicyProvider;
using Backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Configurations;

public static class JwtConfiguration
{
    public static void AddJwtConfiguration(this IServiceCollection services, IConfiguration configuration,
        IHostEnvironment environment)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidAudience = configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!)),
            };
            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    if (context.Exception is SecurityTokenExpiredException)
                    {
                        context.Response.Headers.Add("Token-Expired", "true");
                        if (environment.IsDevelopment())
                            context.HttpContext.Response.WriteAsJsonAsync(new ServerDevErrorResponse()
                            {
                                Message =  context.Exception.Message,
                                StackTrace = context.Exception.StackTrace
                            });
                        else
                            context.HttpContext.Response.WriteAsJsonAsync(new ErrorResponse()
                                { Message = "Unauthorized" });
                    }
                    else
                    {
                        context.Response.Headers.Add("Token-Invalid", "true");
                        if (environment.IsDevelopment())
                            context.HttpContext.Response.WriteAsJsonAsync(new ServerDevErrorResponse()
                            {
                                Message =  context.Exception.Message,
                                StackTrace = context.Exception.StackTrace
                            });
                        else
                            context.HttpContext.Response.WriteAsJsonAsync(new ErrorResponse()
                                { Message = "Unauthorized" });
                    }

                    return Task.CompletedTask;
                },
                
                OnChallenge = context =>
                {
                    context.HandleResponse();
                    return Task.CompletedTask;
                },
                
                OnForbidden = context =>
                {
                    context.Response.Headers.Add("Forbidden", "true");
                    context.Response.WriteAsJsonAsync(new ErrorResponse()
                    {
                        Message = "Forbidden"
                    });
                    return Task.CompletedTask;
                },
                
                OnMessageReceived = context =>
                {
                    var requiresAuthorization = context.HttpContext.GetEndpoint()?.Metadata.GetMetadata<AuthorizeAttribute>() != null;
                    if (requiresAuthorization)
                    {
                        string? token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                        if (string.IsNullOrEmpty(token) || token?.Split('.').Length != 3)
                        {
                            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                            context.Response.ContentType = "application/json";
                            context.HttpContext.Response.WriteAsJsonAsync(new ErrorResponse() { Message = "Unauthorized" });
                        }
                    }
                    return Task.CompletedTask;
                }
            };
        });
        
        services.AddAuthorization(options =>
        {
            options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .Build();
        });
        
        // Register our custom Authorization handler
        services.AddTransient<IAuthorizationHandler, PermissionHandler>();

        // Overrides the DefaultAuthorizationPolicyProvider with our own
        services.AddSingleton<IAuthorizationPolicyProvider, PermissionAuthorizationPolicyProvider>();
    }
}