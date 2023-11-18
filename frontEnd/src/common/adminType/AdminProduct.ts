export interface AdminProductType {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    reviewsScore?: number;
    brandId: number;
    categoryId: number;
    needId?: number;
    viewable?: true;
    warranty?: string;
    createdAt: string;
    updatedAt: string;
}
