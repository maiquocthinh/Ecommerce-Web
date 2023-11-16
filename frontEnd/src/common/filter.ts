export interface filterType {
    NeedId?: string;
    CategoryId?: string;
    BrandId?: string;
    PriceRange?: { MinPrice?: number; MaxPrice?: number };
    IsOutOfStock?: boolean;
    new?: boolean;
}
