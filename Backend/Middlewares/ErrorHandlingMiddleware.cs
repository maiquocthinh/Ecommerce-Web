using Backend.Data;

namespace Backend.Middlewares;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IHostEnvironment _env;

    public ErrorHandlingMiddleware(RequestDelegate next, IHostEnvironment env)
    {
        _next = next;
        _env = env;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);

            if (context.Response.StatusCode == StatusCodes.Status404NotFound)
            {
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(new ErrorResponse() { Message = "Not Found Resource." });
            }
        }
        catch (Exception ex)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            
            if (_env.IsDevelopment())
            {
                await context.Response.WriteAsJsonAsync(new ServerDevErrorResponse()
                {
                    Message = ex.Message,
                    StackTrace = ex.StackTrace
                });
            }
            else
            {
                await context.Response.WriteAsJsonAsync(new ErrorResponse()
                {
                    Message = "Something went wrong",
                });
            }
        }
    }
}