import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// useCart provee el estado global del carrito (items, totales y operaciones)
import { useCart } from "@/hooks/useCart.hook";
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
      <DialogContent className="max-w-md max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogDescription>Tus productos seleccionados</DialogDescription>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Carrito ({totalItems} {totalItems === 1 ? "producto" : "productos"})
          </DialogTitle>
        </DialogHeader>
        {items.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            Tu carrito está vacío
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3 items-start border-b pb-4 last:border-0"
                >
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-16 h-16 object-cover rounded shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/64x64?text=Sin+Imagen";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2">
                      {product.nombre}
                    </p>
                    <p className="text-sm font-semibold mt-1 text-primary">
                      {product.precio}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(product.id, quantity - 1)
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
                          updateQuantity(product.id, quantity + 1)
                        }
                        className="w-7 h-7 rounded border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer shrink-0 mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
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
