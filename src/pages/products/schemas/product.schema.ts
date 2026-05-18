export interface Product {
  product_id: string;
  product_name: string;
  description: string;
  initial_price: string;
  final_price: string;
  currency: string;
  in_stock: string;
  color: string;
  size: string;
  reviews_count: string;
  main_image: string;
  category_url: string;
  url: string;
  category_tree: string;
  country_code: string;
  domain: string;
  image_count: string;
  image_urls: string;
  model_number: string;
  offers: string | null;
  other_attributes: string;
  rating: string;
  related_products: string | null;
  root_category: string;
  top_reviews: string | null;
  category: string;
  brand: string;
  all_available_sizes: string;
}

export interface PaginationParams {
  skip: number;
  take: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  skip: number;
  take: number;
}