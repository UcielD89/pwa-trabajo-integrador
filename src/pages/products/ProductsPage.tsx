// [AGREGADO] Se importaron useState y los íconos Search, X, SlidersHorizontal
// para construir el buscador y el panel de filtros
import { useProducts } from "./hooks/useProducts.hook";
import { ProductGrid } from "./components/ProductGrid";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export function ProductsPage() {
  // [MODIFICADO] Se desestructuran los nuevos campos del hook:
  // filters, setFilters, clearFilters, categories, hasActiveFilters
  const {
    products,
    total,
    skip,
    take,
    isLoading,
    error,
    filters,
    setFilters,
    clearFilters,
    categories,
    hasActiveFilters,
    canGoNext,
    canGoPrev,
    nextPage,
    prevPage,
  } = useProducts({ initialTake: 8 });

  // [AGREGADO] Controla si el panel de filtros avanzados está desplegado o no
  const [showFilters, setShowFilters] = useState(false);

  const currentPage = Math.floor(skip / take) + 1;
  const totalPages = Math.ceil(total / take);

  return (
    <div className="container mx-auto py-8 px-4">

      {/* [AGREGADO] Barra de búsqueda: input de texto con ícono de lupa.
          Llama a setFilters({ search }) en cada pulsación de tecla para
          filtrar en tiempo real. El botón X limpia solo el campo de búsqueda. */}
      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {/* Botón para limpiar solo el texto de búsqueda */}
          {filters.search && (
            <button
              onClick={() => setFilters({ search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* [AGREGADO] Botón que alterna la visibilidad del panel de filtros.
            Muestra un indicador "!" cuando hay filtros activos */}
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters((v) => !v)}
          className="gap-2 cursor-pointer shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {hasActiveFilters && (
            <span className="bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              !
            </span>
          )}
        </Button>
      </div>

      {/* [AGREGADO] Panel de filtros avanzados: se muestra/oculta con showFilters.
          Contiene: categoría, precio mínimo, precio máximo, en stock y con descuento. */}
      {showFilters && (
        <div className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Filtro por categoría: select poblado dinámicamente desde getCategories() */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Categoría
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ category: e.target.value })}
                className="w-full border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por precio mínimo */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Precio mínimo ($)
              </label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => setFilters({ minPrice: e.target.value })}
                className="w-full border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Filtro por precio máximo */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Precio máximo ($)
              </label>
              <input
                type="number"
                min="0"
                placeholder="Sin límite"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ maxPrice: e.target.value })}
                className="w-full border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Filtros booleanos: en stock y con descuento */}
            <div className="space-y-3 pt-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block">
                Opciones
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters({ inStockOnly: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm group-hover:text-foreground transition-colors">
                  Solo en stock
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.hasDiscount}
                  onChange={(e) => setFilters({ hasDiscount: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm group-hover:text-foreground transition-colors">
                  Con descuento
                </span>
              </label>
            </div>
          </div>

          {/* Botón "Limpiar filtros": solo visible cuando hay algún filtro activo */}
          {hasActiveFilters && (
            <div className="flex justify-end border-t pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-3 h-3" />
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      )}

      {/* [MODIFICADO] El texto ahora refleja los resultados filtrados y muestra
          la etiqueta "(filtrado)" cuando hay filtros activos */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Productos</h1>
        <p className="text-muted-foreground">
          {total === 0
            ? "No se encontraron productos"
            : `Mostrando ${skip + 1} - ${Math.min(skip + take, total)} de ${total} producto${total !== 1 ? "s" : ""}`}
          {hasActiveFilters && (
            <span className="ml-2 text-xs text-muted-foreground">(filtrado)</span>
          )}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 border border-destructive rounded-lg bg-destructive/10 text-destructive">
          {error}
        </div>
      )}

      <ProductGrid products={products} isLoading={isLoading} />

      {!isLoading && products.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={!canGoPrev}
            className="cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <span className="text-sm">
            Página {currentPage} de {totalPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={!canGoNext}
            className="cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
