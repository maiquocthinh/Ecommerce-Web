export interface orderType {
    orderId: number;
    orderStatus: string;
    totalAmount: number;
    orderDetails: orderDetailsType[];
    shippingInfo: shippingInfoType;
}
export interface orderDetailsType {
    productVersionId: Number;
    productVersionName: string;
    quantity: number;
    price: number;
    originPrice: number;
    totalPrice: number;
}
export interface shippingInfoType {
    recipientName: string;
    phoneNumber: string;
    address: string;
}
