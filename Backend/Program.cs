using Backend.Extensions;
using Backend.Data;
using Backend.Infrastructure.Email;
using Backend.Infrastructure.Jwt;
using Backend.Middlewares;
using Backend.Repositories;
using Backend.Respositories.Interfaces;
using Backend.Services;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Serilog
builder.Host.AddCustomSerilog();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Service configs
builder.Services.AddCors();
builder.Services.AddDbContext<DBContext>(option =>
{
    option
        .UseLazyLoadingProxies()
        .UseSqlServer(builder.Configuration.GetConnectionString("SQLServer"));
});
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddJwtConfiguration(builder.Configuration, builder.Environment);
builder.Services.AddResponseCaching();

builder.Services.AddScoped<JwtUtil>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddSingleton<IEmailService, EmailService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSerilogRequestLogging();

// Use middleware
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseResponseCaching();

app.UseCustomCors(builder.Configuration);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();