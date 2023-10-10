using System.Net;

namespace Backend.Common.Exceptions;

public class NotFoundException: CustomHttpException
{
    public NotFoundException(string? message) : base(message, HttpStatusCode.NotFound)
    {
    }
}