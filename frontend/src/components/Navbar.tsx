// [ARCHIVO NUEVO] Barra de navegación superior persistente.
// Sticky (se mantiene visible al hacer scroll) gracias a "sticky top-0 z-40".
// Contiene el nombre del sitio y el botón del carrito con el conteo de ítems.

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
// useCart se usa para leer totalItems y mostrar el badge sobre el ícono del carrito
import { useCart } from "@/hooks/useCart.hook";
import { CartDrawer } from "./CartDrawer";

export function Navbar() {
  // Solo se necesita totalItems para el badge; no se suscribe a toda la lista de ítems
  const { totalItems } = useCart();

  // Controla si el modal del carrito está abierto
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Nombre/logo del sitio */}
          <span className="font-bold text-xl tracking-tight">PWA Store</span>

          {/* Botón del carrito con badge que muestra la cantidad de ítems.
              El badge solo se renderiza cuando totalItems > 0. */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center font-bold px-1">
                {/* Muestra "99+" para no desbordar el badge si hay más de 99 ítems */}
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Modal del carrito: se monta aquí para que sea accesible desde toda la app */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
