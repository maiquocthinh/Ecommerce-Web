using Backend.Common.Pagging;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Configurations;

public class BaseController: ControllerBase
{
    public BaseController()
    {
    }

    protected SuccessResponse<T> RenderSuccessResponse<T>(T data = null, bool success = true, string message = null ) where T : class
    {
        return new SuccessResponse<T>()
        {
            Success = success,
            Message = message,
            Data = data
        };
    }
    
    protected ErrorResponse RenderErrorResponse<T>(bool success = true, string message = null ) where T : class
    {
        return new ErrorResponse()
        {
            Success = success,
            Message = message,
        };
    }
    
    protected PagingListModel<T> RenderPagingListModel<T>(IQueryable<T> source, int pageIndex, int pageSize) where T : class
    {
        return new PagingListModel<T>(source, pageIndex, pageSize);
    }
}