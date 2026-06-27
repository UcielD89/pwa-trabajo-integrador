import type { Producto } from "../schemas/product.schema";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  productos: Producto[];
  isLoading?: boolean;
}

export function ProductGrid({ productos, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-muted animate-pulse rounded-lg h-64" />
        ))}
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No se encontraron productos
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
        />
      ))}
    </div>
  );
}
