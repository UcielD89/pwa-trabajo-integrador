import { useCallback, useEffect, useState } from "react";
import type { PaginatedResponse, Producto } from "../schemas/product.schema";
import { productosService } from "../services/product.service";
import type { ProductoFilters } from "../schemas/productFilters.schema";

export function useProductos(limit: number = 10) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<Producto>["meta"] | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ProductoFilters>({
    nombre: "",
    categoria: "",
    precio_desde: "",
    precio_hasta: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasActiveFilters =
    filters.nombre.trim() !== "" ||
    filters.categoria !== "" ||
    filters.precio_desde.trim() !== "" ||
    filters.precio_hasta.trim() !== "";

  useEffect(() => {
    const controller = new AbortController();

    const fetchProductos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = hasActiveFilters
          ? await productosService.searchProductos(filters, page, limit, controller.signal)
          : await productosService.getProductos(page, limit, controller.signal);
        setProductos(res.data);
        setMeta(res.meta);
      } catch {
        if (!controller.signal.aborted) {
          setError("Error al cargar los productos. Vuelva a intentarlo mas tarde!!");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    fetchProductos();

    return () => controller.abort();
  }, [page, limit, filters, hasActiveFilters]);

  const applyFilters = useCallback((next: ProductoFilters) => {
    setFilters(next);
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ nombre: "", categoria: "", precio_desde: "", precio_hasta: "" });
    setPage(1);
  }, []);

  return {
    productos,
    meta,
    page,
    filters,
    hasActiveFilters,
    isLoading,
    error,
    applyFilters,
    clearFilters,
    nextPage: () => setPage((prev) => prev + 1),
    prevPage: () => setPage((prev) => prev - 1),
    goToPage: (p: number) => setPage(p),
  };
}
