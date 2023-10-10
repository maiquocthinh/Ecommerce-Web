using System.Net;

namespace Backend.Common.Exceptions;

public class InternalServerException: CustomHttpException
{
    public InternalServerException(string? message) : base(message, HttpStatusCode.InternalServerError)
    {
    }
}