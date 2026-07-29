import { query } from '../config/database.js';

export async function getAll() {
  return query('SELECT id, nombre FROM categorias ORDER BY nombre ASC');
}
