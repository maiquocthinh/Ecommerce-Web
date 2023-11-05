export interface CartType {
    color: string;
    id: string | number;
    image: string;
    inStock: string | number;
    name: string;
    prices: PriceType;
    productVersionId: string | number;
    quantity: string | number;
}
export interface PriceType {
    isDiscount: boolean;
    originalPrice: string | number;
    price: string | number;
}
