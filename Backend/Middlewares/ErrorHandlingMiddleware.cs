using Backend.Common.Exceptions;
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
                throw new NotFoundException("Not Found Resource.");
        }
        catch (CustomHttpException e)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)e.StatusCode;
            if (_env.IsDevelopment())
                await context.Response.WriteAsJsonAsync(new ServerDevErrorResponse()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace
                });
            else
                await context.Response.WriteAsJsonAsync(new ErrorResponse()
                {
                    Message = e.Message,
                });
        }
        catch (Exception e)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            if (_env.IsDevelopment())
                await context.Response.WriteAsJsonAsync(new ServerDevErrorResponse()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace
                });
            else
                await context.Response.WriteAsJsonAsync(new ErrorResponse()
                {
                    Message = "Something went wrong",
                });
        }
    }
}