export interface getProductType {
    Keyword?: string;
    SortedBy?: string;
    pageIndex?: number;
    pageSize?: number;
    Filters?: FiltersType;
}
interface FiltersType {
    Viewable?: boolean;
    OutOfStock?: boolean;
    CategoryId?: number;
    BrandId?: number;
    NeedId?: number;
    PriceRange?: {
        MinPrice?: number;
        MaxPrice?: number;
    };
}
