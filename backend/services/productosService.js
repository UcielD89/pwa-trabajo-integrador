import { getAll, getById } from '../repositories/productosRepository.js';

export async function getAllProductos() {
  return getAll();
}

export async function getProductoById(id) {
  const producto = await getById(id);
  if (!producto) throw new Error('Producto no encontrado');
  return producto;
}
