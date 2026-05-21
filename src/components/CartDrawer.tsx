// [ARCHIVO NUEVO] Modal del carrito de compras.
// Se muestra al hacer click en el ícono del carrito en el Navbar.
// Reutiliza el componente Dialog de shadcn/ui que ya existía en el proyecto.

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// useCart provee el estado global del carrito (items, totales y operaciones)
import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } =
    useCart();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* flex flex-col permite que el área de items tenga scroll independiente
          sin que el footer (total + botones) se desplace fuera de vista */}
      <DialogContent className="max-w-md max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogDescription>Tus productos seleccionados</DialogDescription>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Carrito ({totalItems} {totalItems === 1 ? "producto" : "productos"})
          </DialogTitle>
        </DialogHeader>

        {/* Estado vacío: se muestra cuando no hay ítems en el carrito */}
        {items.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            Tu carrito está vacío
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">

            {/* Área scrolleable con la lista de ítems */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.product_id}
                  className="flex gap-3 items-start border-b pb-4 last:border-0"
                >
                  <img
                    src={product.main_image}
                    alt={product.product_name}
                    className="w-16 h-16 object-cover rounded shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/64x64?text=Sin+Imagen";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2">
                      {product.product_name}
                    </p>
                    <p className="text-sm font-semibold mt-1 text-primary">
                      {product.final_price}
                    </p>

                    {/* Controles de cantidad: − cantidad + */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(product.product_id, quantity - 1)
                        }
                        className="w-7 h-7 rounded border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-6 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(product.product_id, quantity + 1)
                        }
                        className="w-7 h-7 rounded border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Botón para eliminar el ítem del carrito */}
                  <button
                    onClick={() => removeItem(product.product_id)}
                    className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer shrink-0 mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer fijo con el total y los botones de acción */}
            <div className="border-t pt-4 mt-4 space-y-4 shrink-0">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  onClick={clearCart}
                >
                  Vaciar
                </Button>
                <Button className="flex-1 cursor-pointer">
                  Finalizar compra
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
