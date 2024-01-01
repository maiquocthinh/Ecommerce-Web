using System.Net;

namespace Backend.Common.Exceptions;

public class ForbiddenException: CustomHttpException
{
    public ForbiddenException(string? message) : base(message, HttpStatusCode.Forbidden)
    {
    }
}