export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: string
  imagen: string
  categoria_id: number
  categoria_nombre: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}