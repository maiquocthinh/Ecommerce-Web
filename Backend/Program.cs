using Backend.Configurations;
using Backend.Data;
using Backend.Middlewares;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Db Context
builder.Services.AddDbContext<DBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("SQLServer"));
});

// Use Serilog
builder.Host.UseSerilog((context, loggerConfig) 
    => loggerConfig.ReadFrom.Configuration(context.Configuration));

// Add Jwt Config
builder.Services.AddJwtConfiguration(builder.Configuration, builder.Environment);

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();