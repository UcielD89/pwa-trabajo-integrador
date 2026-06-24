// [MODIFICADO] Se agregó useMemo a los imports para memoizar la lista de categorías
import { useState, useCallback, useEffect, useMemo } from "react";
import type { PaginationParams } from "../schemas/product.schema";
// [MODIFICADO] Se reemplazó getProductsPaginated por getProductsFilteredPaginated
// y se agregaron getCategories y DEFAULT_FILTERS para soportar el sistema de filtros
import {
  getProductsFilteredPaginated,
  getCategories,
  DEFAULT_FILTERS,
} from "../services/product.service";
// [AGREGADO] Tipo ProductFilters para tipar el estado de los filtros
import type { ProductFilters } from "../services/product.service";
import type { Product } from "../schemas/product.schema";

interface UseProductsOptions {
  initialTake?: number;
}

// [MODIFICADO] Se agregaron los campos del sistema de filtros al tipo de retorno del hook
interface UseProductsReturn {
  products: Product[];
  total: number;
  skip: number;
  take: number;
  isLoading: boolean;
  error: string | null;
  filters: ProductFilters;
  categories: string[];
  hasActiveFilters: boolean;
  canGoNext: boolean;
  canGoPrev: boolean;
  setFilters: (partial: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  nextPage: () => void;
  prevPage: () => void;
}

export function useProducts(
  options: UseProductsOptions = {},
): UseProductsReturn {
  const { initialTake = 10 } = options;

  const [pagination, setPaginationState] = useState<PaginationParams>({
    skip: 0,
    take: initialTake,
  });

  // [AGREGADO] Estado de los filtros, inicializado sin ningún filtro activo
  const [filters, setFiltersState] = useState<ProductFilters>(DEFAULT_FILTERS);

  const [result, setResult] = useState<{
    data: Product[];
    total: number;
    skip: number;
    take: number;
  }>({
    data: [],
    total: 0,
    skip: 0,
    take: initialTake,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // [AGREGADO] Categorías memoizadas: se calculan una sola vez al montar el hook
  // ya que el JSON no cambia durante la sesión
  const categories = useMemo(() => getCategories(), []);

  // [MODIFICADO] fetchProducts ahora recibe currentFilters como segundo parámetro
  // para pasárselos a getProductsFilteredPaginated
  const fetchProducts = useCallback(
    (params: PaginationParams, currentFilters: ProductFilters) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = getProductsFilteredPaginated(params, currentFilters);
        setResult(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setResult({ data: [], total: 0, skip: params.skip, take: params.take });
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Actualización por busqueda con filtros
  useEffect(() => {
    fetchProducts(pagination, filters);
  }, [pagination, filters, fetchProducts]);

  // [AGREGADO] Actualiza filtros de forma parcial (merge) y resetea la paginación
  // al inicio para no quedar en una página que ya no existe con los nuevos resultados
  const setFilters = useCallback((partial: Partial<ProductFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
    setPaginationState((prev) => ({ ...prev, skip: 0 }));
  }, []);

  // [AGREGADO] Resetea todos los filtros a sus valores por defecto y vuelve a la página 1
  const clearFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPaginationState((prev) => ({ ...prev, skip: 0 }));
  }, []);

  // [MODIFICADO] nextPage y prevPage ahora solo actualizan el estado de paginación.
  // El useEffect se encarga de disparar la búsqueda, evitando llamadas duplicadas
  const nextPage = useCallback(() => {
    const newSkip = pagination.skip + pagination.take;
    if (newSkip < result.total) {
      setPaginationState({ skip: newSkip, take: pagination.take });
    }
  }, [pagination, result.total]);

  const prevPage = useCallback(() => {
    if (pagination.skip > 0) {
      const newSkip = Math.max(0, pagination.skip - pagination.take);
      setPaginationState({ skip: newSkip, take: pagination.take });
    }
  }, [pagination]);

  // [AGREGADO] Verdadero si al menos uno de los filtros tiene un valor activo.
  // Se usa en la UI para mostrar un indicador visual en el botón de filtros.
  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "__all__" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.inStockOnly ||
    filters.hasDiscount;

  return {
    products: result.data,
    total: result.total,
    skip: result.skip,
    take: result.take,
    isLoading,
    error,
    // [AGREGADO] Campos nuevos del sistema de filtros
    filters,
    setFilters,
    clearFilters,
    categories,
    hasActiveFilters,
    canGoNext: pagination.skip + pagination.take < result.total,
    canGoPrev: pagination.skip > 0,
    nextPage,
    prevPage,
  };
}
