using Backend.Common.Pagging;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

public class BaseController : ControllerBase
{
    public BaseController()
    {
    }

    protected SuccessResponse<T> RenderSuccessResponse<T>(T data = null, string message = null) where T : class
    {
        return new SuccessResponse<T>()
        {
            Message = message,
            Data = data
        };
    }

    protected SuccessResponseWithoutData RenderSuccessResponseWithoutData(string message = null)
    {
        return new SuccessResponseWithoutData()
        {
            Message = message,
        };
    }

    protected ErrorResponse RenderErrorResponse<T>(string message = null) where T : class
    {
        return new ErrorResponse()
        {
            Message = message,
        };
    }

    protected PagingListModel<T> RenderPagingListModel<T>(IQueryable<T> source, int pageIndex, int pageSize) where T : class
    {
        return new PagingListModel<T>(source, pageIndex, pageSize);
    }
}