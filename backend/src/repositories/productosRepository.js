import { query } from '../config/database.js';

const BASE_QUERY = `
  SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen, p.categoria_id,
        c.nombre AS categoria_nombre
  FROM productos p
  JOIN categorias c ON p.categoria_id = c.id
`;

export async function getAll({ limit, offset }) {
  const rows = await query(`${BASE_QUERY} LIMIT ? OFFSET ?`, [limit, offset]);
  const [{ total }] = await query('SELECT COUNT(*) AS total FROM productos');
  return { rows, total: Number(total) };
}

export async function search({
  nombre,
  categoriaId,
  categoriaNombre,
  precioDesde,
  precioHasta,
  limit,
  offset,
}) {
  const conditions = [];
  const params = [];

  if (nombre) {
    conditions.push("p.nombre LIKE ? ESCAPE '!'");
    const escapedNombre = nombre.replace(/[!%_]/g, '!$&');
    params.push(`%${escapedNombre}%`);
  }

  if (categoriaId) {
    conditions.push('p.categoria_id = ?');
    params.push(categoriaId);
  } else if (categoriaNombre) {
    conditions.push('c.nombre = ?');
    params.push(categoriaNombre);
  }

  if (precioDesde !== undefined) {
    conditions.push('p.precio >= ?');
    params.push(precioDesde);
  }

  if (precioHasta !== undefined) {
    conditions.push('p.precio <= ?');
    params.push(precioHasta);
  }

  const where = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';
  const rows = await query(
    `${BASE_QUERY}${where} ORDER BY p.id ASC LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  );
  const [{ total }] = await query(
    `SELECT COUNT(*) AS total FROM productos p JOIN categorias c ON p.categoria_id = c.id${where}`,
    params,
  );

  return { rows, total: Number(total) };
}

export async function getById(id) {
  const rows = await query(`${BASE_QUERY} WHERE p.id = ?`, [id]);
  return rows[0] ?? null;
}
