export interface ICategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IProductImage {
  id: number;
  product_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  cat_id: number;
  created_at: string;
  updated_at: string;
  category: ICategory;
  images: IProductImage[];
}

export interface IProductsResponse {
  products: IProduct[];
}

export interface ICartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ICartItem extends ICartProduct {
  quantity: number;
}

// types/dashboard.ts

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  href?: string;
  badge?: number;
}

export interface StatCard {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ReactElement;
  color: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  avatar: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  sales: number;
  revenue: number;
  stock: number;
}

export interface SalesData {
  name: string;
  sales: number;
  revenue: number;
  orders: number;
}