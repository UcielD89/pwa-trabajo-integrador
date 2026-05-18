import { useState, useCallback, useEffect } from "react";
import type { PaginationParams } from "../schemas/product.schema";
import { getProductsPaginated } from "../services/product.service";
import type { Product } from "../schemas/product.schema";

interface UseProductsOptions {
  initialTake?: number;
}

interface UseProductsReturn {
  products: Product[];
  total: number;
  skip: number;
  take: number;
  isLoading: boolean;
  error: string | null;
  setPagination: (params: PaginationParams) => void;
  refetch: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  nextPage: () => void;
  prevPage: () => void;
}

export function useProducts(
  options: UseProductsOptions = {}
): UseProductsReturn {
  const { initialTake = 10 } = options;

  const [pagination, setPaginationState] = useState<PaginationParams>({
    skip: 0,
    take: initialTake,
  });

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

  const fetchProducts = useCallback((params: PaginationParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = getProductsPaginated(params);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setResult({ data: [], total: 0, skip: params.skip, take: params.take });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(pagination);
  }, [pagination, fetchProducts]);

  const refetch = useCallback(() => {
    fetchProducts(pagination);
  }, [pagination, fetchProducts]);

  const setPagination = useCallback(
    (params: PaginationParams) => {
      setPaginationState(params);
      fetchProducts(params);
    },
    [fetchProducts]
  );

  const nextPage = useCallback(() => {
    const newSkip = pagination.skip + pagination.take;
    if (newSkip < result.total) {
      setPagination({ skip: newSkip, take: pagination.take });
    }
  }, [pagination, result.total]);

  const prevPage = useCallback(() => {
    const newSkip = Math.max(0, pagination.skip - pagination.take);
    if (pagination.skip > 0) {
      setPagination({ skip: newSkip, take: pagination.take });
    }
  }, [pagination]);

  return {
    products: result.data,
    total: result.total,
    skip: result.skip,
    take: result.take,
    isLoading,
    error,
    setPagination,
    refetch,
    canGoNext: pagination.skip + pagination.take < result.total,
    canGoPrev: pagination.skip > 0,
    nextPage,
    prevPage,
  };
}