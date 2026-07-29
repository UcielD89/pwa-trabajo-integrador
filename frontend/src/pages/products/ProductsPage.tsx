import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductGrid } from "./components/ProductGrid";
import { useProductos } from "./hooks/useProductos.hook";
import Loader from "@/components/Loading/LoaderComponent";

function ProductsPage() {
  const {
    productos,
    meta,
    page,
    isLoading,
    error,
    nextPage,
    prevPage,
  } = useProductos(10);

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Productos</h1>
      </div>
      <ProductGrid productos={productos} isLoading={isLoading} />
      {meta && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={page === 1}
            className="cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm">
            Página {meta.page} de {meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={page === meta.totalPages}
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
