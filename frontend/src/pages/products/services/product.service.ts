import axios from "@/config/axios.config";
import { ProductoSchema, PaginatedProductosSchema } from '@/pages/products/schemas/product.schema'
import type { Producto, PaginatedResponse } from '@/pages/products/schemas/product.schema'
import type { ProductoFilters } from '../schemas/productFilters.schema'

export const productosService = {
  getProductos: async (
    page: number,
    limit: number,
    signal?: AbortSignal,
  ): Promise<PaginatedResponse<Producto>> => {
    const { data } = await axios.get("/productos", { params: { page, limit }, signal });
    return PaginatedProductosSchema.parse(data);
  },
  searchProductos: async (
    filters: Partial<ProductoFilters>,
    page: number,
    limit: number,
    signal?: AbortSignal,
  ): Promise<PaginatedResponse<Producto>> => {
    const params: Record<string, string | number> = { page, limit };

    const nombre = filters.nombre?.trim();
    if (nombre) params.nombre = nombre;

    const categoria = filters.categoria?.trim();
    if (categoria) params.categoria = categoria;

    const precioDesde = filters.precio_desde?.trim();
    if (precioDesde) params.precio_desde = precioDesde;

    const precioHasta = filters.precio_hasta?.trim();
    if (precioHasta) params.precio_hasta = precioHasta;

    const { data } = await axios.get("/productos/search", { params, signal });
    return PaginatedProductosSchema.parse(data);
  },
  getProductoById: async (id: number): Promise<Producto> => {
    const { data } = await axios.get(`/productos/${id}`);
    return ProductoSchema.parse(data);
  }
}
