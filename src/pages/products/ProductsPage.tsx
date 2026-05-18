import { useProducts } from "./hooks/useProducts.hook";
import { ProductGrid } from "./components/ProductGrid";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductsPage() {
  const {
    products,
    total,
    skip,
    take,
    isLoading,
    error,
    canGoNext,
    canGoPrev,
    nextPage,
    prevPage,
  } = useProducts({ initialTake: 8 });

  const currentPage = Math.floor(skip / take) + 1;
  const totalPages = Math.ceil(total / take);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Productos</h1>
        <p className="text-muted-foreground">
          Mostrando {skip + 1} - {Math.min(skip + take, total)} de {total}{" "}
          productos
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
            className=" cursor-pointer"
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
            className=" cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
