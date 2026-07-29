import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductGrid } from "./components/ProductGrid";
import Loader from "@/components/Loading/LoaderComponent";
import type { PaginationMeta, Producto } from "./schemas/product.schema";

interface ProductsPageProps {
  productos: Producto[];
  meta: PaginationMeta | null;
  page: number;
  isLoading: boolean;
  error: string | null;
  nextPage: () => void;
  prevPage: () => void;
}

function ProductsPage({
  productos,
  meta,
  page,
  isLoading,
  error,
  nextPage,
  prevPage,
}: ProductsPageProps) {
  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  const totalPages = meta?.totalPages ?? 1;
  const hasPrev = page > 1;
  const hasNext = meta !== null && page < totalPages;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Productos</h1>
      </div>
      <ProductGrid productos={productos} isLoading={isLoading} />
      {meta && meta.total > 0 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={!hasPrev}
            className="cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={!hasNext}
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
