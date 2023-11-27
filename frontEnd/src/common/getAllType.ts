export interface getProductType {
    Keyword?: string;
    SortedBy?: string;
    pageIndex?: number;
    pageSize?: number;
    Filters?: FiltersType;
}
export interface FiltersType {
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
export interface getEmployeesType {
    Keyword?: string;
    RoleId?: number;
    pageIndex: number;
    pageSize: number;
}
export interface defautlParametersGet {
    pageIndex: number;
    pageSize: number;
    name?: string;
}
