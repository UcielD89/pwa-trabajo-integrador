import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart.hook";
import { CartDrawer } from "./CartDrawer";
import { FiltersPanel } from "@/pages/products/components/FiltersPanel";
import type { ProductoFilters } from "@/pages/products/schemas/productFilters.schema";
import type { Categoria } from "@/pages/products/schemas/categoria.schema";

interface NavbarProps {
  categorias: Categoria[];
  isCategoriesLoading: boolean;
  categoriesError: string | null;
  filters: ProductoFilters;
  hasActiveFilters: boolean;
  onApplyFilters: (filters: ProductoFilters) => void;
  onClearFilters: () => void;
}

export function Navbar({
  categorias,
  isCategoriesLoading,
  categoriesError,
  filters,
  hasActiveFilters,
  onApplyFilters,
  onClearFilters,
}: NavbarProps) {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight">PWA Store</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFiltersOpen(true)}
              className="relative p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
              aria-label="Buscar y filtrar productos"
              aria-expanded={filtersOpen}
            >
              <Search className="w-6 h-6" />
              {hasActiveFilters && (
                <span className="absolute top-1 right-1 size-2 rounded-full bg-primary ring-2 ring-background" />
              )}
            </button>
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
        </div>
      </nav>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <FiltersPanel
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        categorias={categorias}
        isCategoriesLoading={isCategoriesLoading}
        categoriesError={categoriesError}
        initialValues={filters}
        onApply={onApplyFilters}
        onClear={onClearFilters}
      />
    </>
  );
}
