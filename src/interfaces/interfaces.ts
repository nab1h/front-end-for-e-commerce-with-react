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
