export interface importsType {
    id: number;
    employee: string;
    supplier: string;
    totalAmount: number;
    createdAt: string;
}

export interface allInventoryType {
    color: string;
    imageUrl: string;
    inventory: number;
    isOutOfStock: boolean;
    productVersionId: number;
    productVersionName: string;
}
export interface importShipmentsgetType {
    productVersionId: number;
    quantity: number;
    cost: number;
}
export interface importShipmentsType {
    supplierId: number;
    importShipments: importShipmentsgetType[];
}
