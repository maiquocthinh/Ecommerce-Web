using System.Net;

namespace Backend.Common.Exceptions;

public class UnauthorizedException: CustomHttpException
{
    public UnauthorizedException(string? message) : base(message, HttpStatusCode.Unauthorized)
    {
    }
}