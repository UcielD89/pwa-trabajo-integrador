import { getAllProductos, getProductoById } from '../services/productosService.js';

export async function getAllProductosHandler(req, res) {
  try {
    const productos = await getAllProductos();
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProductoByIdHandler(req, res) {
  try {
    const producto = await getProductoById(req.params.id);
    res.status(200).json(producto);
  } catch (err) {
    if (err.message === 'Producto no encontrado') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(500).json({ error: err.message });
  }
}
