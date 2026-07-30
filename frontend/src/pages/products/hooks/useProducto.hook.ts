import { useEffect, useState } from "react";
import type { Producto } from "../schemas/product.schema";
import { productosService } from "../services/product.service";

export function useProducto(id: number) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProducto = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await productosService.getProductoById(id);
        setProducto(data);
      } catch {
        setError(
          "Error al cargar el producto. Vuelva a intentarlo mas tarde!!",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  return {
    producto,
    isLoading,
    error
  }
}
