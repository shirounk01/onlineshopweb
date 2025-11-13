export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  sellerName: string;
  price: number;
  quantity: number;
}
