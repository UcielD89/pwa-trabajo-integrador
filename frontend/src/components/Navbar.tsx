import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart.hook";
import { CartDrawer } from "./CartDrawer";

export function Navbar() {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight">PWA Store</span>
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center font-bold px-1">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
