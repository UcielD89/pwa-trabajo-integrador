import { query } from '../src/config/database.js';

const BASE_QUERY = `
  SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen, p.categoria_id,
        c.nombre AS categoria_nombre
  FROM productos p
  JOIN categorias c ON p.categoria_id = c.id
`;

export async function getAll() {
  return query(BASE_QUERY);
}

export async function getById(id) {
  const rows = await query(`${BASE_QUERY} WHERE p.id = ?`, [id]);
  return rows[0] ?? null;
}
