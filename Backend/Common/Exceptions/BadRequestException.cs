using System.Net;

namespace Backend.Common.Exceptions;

public class BadRequestException: CustomHttpException
{
    public BadRequestException(string? message) : base(message, HttpStatusCode.BadRequest)
    {
    }
}