import { getAll, getById } from "../repositories/productosRepository.js";

export async function getAllProductos({ page = 1, limit = 10 } = {}) {
  const offset = (page - 1) * limit;
  const { rows, total } = await getAll({ limit, offset });
  return {
    data: rows,
    meta: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    },
  };
}

export async function getProductoById(id) {
  const producto = await getById(id);
  if (!producto) throw new Error("Producto no encontrado");
  return producto;
}
