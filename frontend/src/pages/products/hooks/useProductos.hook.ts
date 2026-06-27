import { useEffect, useState } from "react";
import type { PaginatedResponse, Producto } from "../schemas/product.schema";
import { productosService } from "../services/product.service";

export function useProductos(limit: number = 10) {
  // States
  const [productos, setProductos] = useState<Producto[]>([]);
  // States para procesar la paginación
  const [meta, setMeta] = useState<PaginatedResponse<Producto>["meta"] | null>(null);
  const [page, setPage] = useState(1);
  // Estado y errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await productosService.getProductos(page, limit);
        setProductos(res.data);
        setMeta(res.meta);
      } catch {
        setError(
          "Error al cargar los productos. Vuelva a intentarlo mas tarde!!",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductos();
  }, [page, limit]);

  return {
    productos,
    meta,
    page,
    isLoading,
    error,
    nextPage: () => setPage((prev) => prev + 1),
    prevPage: () => setPage((prev) => prev - 1),
    goToPage: (p: number) => setPage(p),
  }
}
