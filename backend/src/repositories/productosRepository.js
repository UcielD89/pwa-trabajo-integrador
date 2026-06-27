import { query } from '../config/database.js';

const BASE_QUERY = `
  SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen, p.categoria_id,
        c.nombre AS categoria_nombre
  FROM productos p
  JOIN categorias c ON p.categoria_id = c.id
`;

/**
 * ## Parametros de paginación
 * Son dos cláusulas que trabajan juntas para "recortar" los resultados de una query.
 * @param limit - cuántos registros traer
 * @param offset - cuántos registros saltear antes de empezar a traer
 * @returns 
 */
export async function getAll({limit, offset}) {
  const rows = await query(`${BASE_QUERY} LIMIT ? OFFSET ?`, [limit, offset]);
  // Obtenemos la totalidad de registro en la DB de productos
  const [{ total }] = await query('SELECT COUNT(*) AS total FROM productos');
  return { rows, total: Number(total)};
}

export async function getById(id) {
  const rows = await query(`${BASE_QUERY} WHERE p.id = ?`, [id]);
  return rows[0] ?? null;
}
