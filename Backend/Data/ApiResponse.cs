namespace Backend.Data;

public class SuccessResponseWithoutData
{
    public bool Success { get; } = true;
    public string Message { get; set; } = string.Empty;
}

public class SuccessResponse<T>: SuccessResponseWithoutData
{
    public T? Data { get; set; }
}

public class ErrorResponse
{
    public bool Success { get; } = false;
    public string Message { get; set; } = string.Empty;
}

public class ServerDevErrorResponse
{
    public bool Success { get; } = false;
    public string Message { get; set; } = string.Empty;
    public string? StackTrace { get; set; } = string.Empty;
    
}