import { useEffect, useState } from "react";
import type { Categoria } from "../schemas/categoria.schema";
import { categoriasService } from "../services/categoria.service";

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchCategorias = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await categoriasService.getCategorias();
        if (active) setCategorias(response);
      } catch {
        if (active) setError("No se pudieron cargar las categorías");
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchCategorias();

    return () => {
      active = false;
    };
  }, []);

  return { categorias, isLoading, error };
}
