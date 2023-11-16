export interface productVersion {
    id: number | string;
    imageUrl: string;
    color: string;
    isOutOfStock: boolean;
    name: string;
    originPrice: string;
    price: string;
}
export interface ProductType {
    id: number | string;
    imageUrl: string;
    name: string;
    price: string | number;
    originPrice: string | number;
    discountPercent: string | number;
    reviewsScore: number;
    isOutOfStock: boolean;
    catalogs: {
        categoryId: string | number;
    };
    productVersions?: productVersion[];
}
export interface paramsProductType {
    Keyword?: string;
    pageIndex?: string;
    pageSize?: string;
    SortedBy?: string;
    Filters?: {
        IsOutOfStock?: boolean;
        BrandId?: string | number;
        NeedId?: string | number;
        CategoryId?: string | number;
        PriceRange?: {
            MinPrice?: number;
            MaxPrice?: number;
        };
    };
}
