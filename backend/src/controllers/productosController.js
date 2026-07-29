import {
  getAllProductos,
  getProductoById,
  searchProductos,
} from '../services/productosService.js';

const MAX_PAGE = 1_000_000;
const MAX_LIMIT = 50;

function parsePositiveInteger(value, fallback, maximum) {
  if (value === undefined) return fallback;
  if (typeof value !== 'string' || !/^0*[1-9]\d*$/.test(value)) return null;

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed <= maximum ? parsed : null;
}

function parsePagination(query) {
  const page = parsePositiveInteger(query.page, 1, MAX_PAGE);
  const limit = parsePositiveInteger(query.limit, 10, MAX_LIMIT);

  return page === null || limit === null ? null : { page, limit };
}

function parseOptionalPrice(value) {
  if (value === undefined || value.trim() === '') return undefined;
  const price = Number(value);
  return Number.isFinite(price) && price >= 0 ? price : null;
}

export async function getAllProductosHandler(req, res) {
  try {
    const pagination = parsePagination(req.query);
    if (!pagination) {
      return res.status(400).json({ error: 'page y limit deben ser enteros positivos válidos' });
    }

    const productos = await getAllProductos(pagination);
    res.status(200).json(productos);
  } catch (err) {
    console.error('[getAllProductos]', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function searchProductosHandler(req, res) {
  try {
    const rawCategoria = req.query.categoria ?? req.query['categoría'];
    const values = [
      req.query.nombre,
      rawCategoria,
      req.query.precio_desde,
      req.query.precio_hasta,
      req.query.page,
      req.query.limit,
    ];

    if (values.some((value) => value !== undefined && typeof value !== 'string')) {
      return res.status(400).json({ error: 'Los filtros deben ser strings' });
    }

    const nombre = req.query.nombre?.trim() || undefined;
    const categoria = rawCategoria?.trim() || undefined;
    const precioDesde = parseOptionalPrice(req.query.precio_desde);
    const precioHasta = parseOptionalPrice(req.query.precio_hasta);

    if (precioDesde === null || precioHasta === null) {
      return res.status(400).json({ error: 'Los precios deben ser números positivos' });
    }

    if (precioDesde !== undefined && precioHasta !== undefined && precioDesde > precioHasta) {
      return res.status(400).json({ error: 'precio_desde no puede ser mayor que precio_hasta' });
    }

    if (nombre && nombre.length > 255) {
      return res.status(400).json({ error: 'El nombre no puede superar los 255 caracteres' });
    }

    if (categoria && categoria.length > 100) {
      return res.status(400).json({ error: 'La categoría no puede superar los 100 caracteres' });
    }

    if (categoria && /^\d+$/.test(categoria) && Number(categoria) <= 0) {
      return res.status(400).json({ error: 'La categoría debe ser un id positivo o un nombre' });
    }

    const pagination = parsePagination(req.query);
    if (!pagination) {
      return res.status(400).json({ error: 'page y limit deben ser enteros positivos válidos' });
    }

    const productos = await searchProductos({
      nombre,
      categoria,
      precioDesde,
      precioHasta,
      ...pagination,
    });

    res.status(200).json(productos);
  } catch (err) {
    console.error('[searchProductos]', err);
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
