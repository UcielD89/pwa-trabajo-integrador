import axios from "@/config/axios.config";
import { ProductoSchema, PaginatedProductosSchema } from '@/pages/products/schemas/product.schema'
import type { Producto, PaginatedResponse } from '@/pages/products/schemas/product.schema'

export const productosService = {
  getProductos: async (page: number, limit: number): Promise<PaginatedResponse<Producto>> => {
    const { data } = await axios.get("/productos", { params: { page, limit } });
    return PaginatedProductosSchema.parse(data);
  },
  getProductoById: async (id: number): Promise<Producto> => {
    const { data } = await axios.get(`/productos/${id}`);
    return ProductoSchema.parse(data);
  }
}
