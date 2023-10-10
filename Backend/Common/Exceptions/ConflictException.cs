using System.Net;

namespace Backend.Common.Exceptions;

public class ConflictException: CustomHttpException
{
    public ConflictException(string? message) : base(message, HttpStatusCode.Conflict)
    {
    }
}