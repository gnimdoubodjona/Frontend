export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    category: string;
    rating: number;
    onSale: boolean;
    createdBy: string;
    createdAt: Date;
}

export interface Category {
    id: number;
    name: string;
    icon: string;
    productCount: number;
}
