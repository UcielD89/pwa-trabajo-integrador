import { getAll, getById, search } from '../repositories/productosRepository.js';

function paginate(rows, total, page, limit) {
  return {
    data: rows,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getAllProductos({ page = 1, limit = 10 } = {}) {
  const offset = (page - 1) * limit;
  const { rows, total } = await getAll({ limit, offset });
  return paginate(rows, total, page, limit);
}

export async function searchProductos({
  nombre,
  categoria,
  precioDesde,
  precioHasta,
  page = 1,
  limit = 10,
} = {}) {
  const offset = (page - 1) * limit;
  const categoriaId = categoria && /^\d+$/.test(categoria) ? Number(categoria) : undefined;
  const categoriaNombre = categoriaId === undefined ? categoria : undefined;
  const { rows, total } = await search({
    nombre,
    categoriaId,
    categoriaNombre,
    precioDesde,
    precioHasta,
    limit,
    offset,
  });

  return paginate(rows, total, page, limit);
}

export async function getProductoById(id) {
  const producto = await getById(id);
  if (!producto) throw new Error('Producto no encontrado');
  return producto;
}
