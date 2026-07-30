import { getAllCategorias } from '../services/categoriasService.js';

export async function getAllCategoriasHandler(req, res) {
  try {
    const categorias = await getAllCategorias();
    res.status(200).json(categorias);
  } catch (err) {
    console.error('[getAllCategorias]', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
