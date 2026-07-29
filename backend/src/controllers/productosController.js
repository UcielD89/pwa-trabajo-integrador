import { getAllProductos, getProductoById } from '../services/productosService.js';

export async function getAllProductosHandler(req, res) {
  try {
    const rawPage  = parseInt(req.query.page,  10);
    const rawLimit = parseInt(req.query.limit, 10);

    const page  = (!isNaN(rawPage)  && rawPage  > 0) ? rawPage                 : 1;
    const limit = (!isNaN(rawLimit) && rawLimit > 0) ? Math.min(rawLimit, 50)  : 10;

    const productos = await getAllProductos({ page, limit });
    res.status(200).json(productos);
  } catch (err) {
    console.error('[getAllProductos]', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function getProductoByIdHandler(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
    }

    const producto = await getProductoById(id);
    res.status(200).json(producto);
  } catch (err) {
    if (err.message === 'Producto no encontrado') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    console.error('[getProductoById]', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
