import { z } from 'zod'

export const ProductoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  precio: z.coerce.number(),
  imagen: z.string(),
  categoria_id: z.number(),
  categoria_nombre: z.string(),
})

export const PaginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})

export const PaginatedProductosSchema = z.object({
  data: z.array(ProductoSchema),
  meta: PaginationMetaSchema,
})

export type Producto = z.infer<typeof ProductoSchema>
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>
export type PaginatedResponse<T> = {
  data: T[]
  meta: PaginationMeta
}
