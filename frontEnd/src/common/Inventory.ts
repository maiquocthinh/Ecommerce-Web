export interface importsType {
    supplierId: number;
    importShipments: [
        {
            productVersionId: number;
            quantity: number;
            cost: number;
        }
    ];
}
