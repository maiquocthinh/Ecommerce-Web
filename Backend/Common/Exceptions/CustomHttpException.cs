using System.Net;

namespace Backend.Common.Exceptions;

public class CustomHttpException: Exception
{
    public HttpStatusCode StatusCode { get; set; }

    public CustomHttpException(string? message, HttpStatusCode statusCode = HttpStatusCode.InternalServerError) : base(message)
    {
        StatusCode = statusCode;
    }
}