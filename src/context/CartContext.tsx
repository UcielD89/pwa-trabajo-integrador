// [ARCHIVO NUEVO] Contexto global del carrito de compras.
// Usa React Context para compartir el estado del carrito entre componentes
// que no tienen relación padre-hijo directa (ej: ProductModal y Navbar).

import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/pages/products/schemas/product.schema";

// Representa un ítem dentro del carrito: el producto y la cantidad seleccionada
export interface CartItem {
  product: Product;
  quantity: number;
}

// Define las operaciones y datos que el contexto expone a los componentes hijos
interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  // Total de unidades en el carrito (suma de todas las cantidades)
  totalItems: number;
  // Precio total calculado en base a final_price × quantity de cada ítem
  totalPrice: number;
}

// Se inicializa como null; el hook useCart verifica que esté dentro del Provider
const CartContext = createContext<CartContextValue | null>(null);

// Componente proveedor: debe envolver la app en App.tsx para que
// todos los componentes hijos puedan acceder al carrito
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Si el producto ya existe en el carrito, incrementa su cantidad en 1.
  // Si no existe, lo agrega con quantity: 1.
  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.product_id === product.product_id);
      if (existing) {
        return prev.map((i) =>
          i.product.product_id === product.product_id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  // Elimina completamente un ítem del carrito por su ID
  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.product_id !== productId));
  }, []);

  // Actualiza la cantidad de un ítem; si quantity <= 0, lo elimina del carrito
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.product_id === productId ? { ...i, quantity } : i
        )
      );
    },
    [removeItem]
  );

  // Vacía el carrito por completo
  const clearCart = useCallback(() => setItems([]), []);

  // Valores derivados calculados en cada render a partir del estado items
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => {
    // final_price viene pre-formateado con "$" desde el servicio, se elimina para parsear
    const price = parseFloat(i.product.final_price.replace("$", ""));
    return sum + (isNaN(price) ? 0 : price * i.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook de acceso al contexto del carrito.
// Lanza un error si se usa fuera de CartProvider para detectar errores de configuración.
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
