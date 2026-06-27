import type { Producto } from "@/pages/products/schemas/product.schema";

export interface CartItem {
  product: Producto;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Producto) => void;
  addItemWithQuantity: (product: Producto, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}