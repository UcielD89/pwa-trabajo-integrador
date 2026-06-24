import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useProducts } from "./hooks/useProducts.hook";
import { ProductGrid } from "./components/ProductGrid";
import { ProductSearch } from "./components/ProductSearch";

function ProductsPage() {
  const {
    products,
    total,
    skip,
    take,
    isLoading,
    error,
    filters,
    categories,
    canGoNext,
    canGoPrev,
    hasActiveFilters,
    setFilters,
    nextPage,
    prevPage,
    clearFilters,
  } = useProducts({ initialTake: 8 });

  const currentPage = Math.floor(skip / take) + 1;
  const totalPages = Math.ceil(total / take);

  return (
    <div className="container mx-auto py-8 px-4">
      <ProductSearch
        searchValue={filters.search}
        onSearchChange={(value) => setFilters({ search: value })}
        filters={filters}
        categories={categories}
        setFilters={setFilters}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Productos</h1>
        <p className="text-muted-foreground">
          {total === 0
            ? "No se encontraron productos"
            : `Mostrando ${skip + 1} - ${Math.min(skip + take, total)} de ${total} producto${total !== 1 ? "s" : ""}`}
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

export { ProductsPage };
export default ProductsPage;
