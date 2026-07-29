export interface ProductoFilters {
  nombre: string;
  categoria: string;
  precio_desde: string;
  precio_hasta: string;
}

export const EMPTY_PRODUCTO_FILTERS: ProductoFilters = {
  nombre: "",
  categoria: "",
  precio_desde: "",
  precio_hasta: "",
};
