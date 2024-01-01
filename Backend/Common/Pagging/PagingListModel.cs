namespace Backend.Common.Pagging;

public sealed class PagingListModel<T> where T : class
{
    public PagingListModel(IQueryable<T> source, int pageIndex, int pageSize)
    {
        pageIndex = pageSize <= 1 ? 1 : pageIndex;
        pageSize = pageSize <= 0 ? 10 : pageSize;
        int total = source.Count();
        int totalPage = total % pageSize > 0 ? total / pageSize + 1 : total / pageSize;

        Paging = new PagingModel()
        {
            PageIndex = pageIndex,
            PageSize = pageSize < 0 ? total : pageSize,
            TotalCount = total,
            TotalPages = totalPage
        };

        List = source.Skip((pageIndex - 1) * pageSize) // Paging
            .Take(pageSize) // Take only a number of items   
            .ToList();
    }

    public IEnumerable<T> List { get; set; }
    public PagingModel Paging { get; set; }
}