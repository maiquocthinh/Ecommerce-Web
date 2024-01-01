using System.Text;
using Backend.Authorization.PolicyProvider;
using Backend.Common.Exceptions;
using Backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Extensions;

public static class JwtExtension
{
    public static IServiceCollection AddJwtConfiguration(this IServiceCollection services, IConfiguration configuration,
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
                    throw new UnauthorizedException("Unauthorized");
                },
                
                OnForbidden = context =>
                {
                    throw new ForbiddenException("Forbidden");
                },
                
                OnMessageReceived = context =>
                {
                    var requiresAuthorization = context.HttpContext.GetEndpoint()?.Metadata.GetMetadata<AuthorizeAttribute>() != null;
                    if (requiresAuthorization)
                    {
                        string? token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                        if (string.IsNullOrEmpty(token) || token?.Split('.').Length != 3)
                        {
                            throw new UnauthorizedException("Unauthorized");
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
        
        return services;
    }
}