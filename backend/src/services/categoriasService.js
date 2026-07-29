import { getAll } from '../repositories/categoriasRepository.js';

export async function getAllCategorias() {
  const categorias = await getAll();
  return { data: categorias };
}
