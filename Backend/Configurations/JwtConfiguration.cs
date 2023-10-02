using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
                
                OnTokenValidated = context =>
                {
                    context.HttpContext.Items["Jwt"] = context.SecurityToken as JwtSecurityToken;
                    return Task.CompletedTask;
                },
            };
        });
    }
}