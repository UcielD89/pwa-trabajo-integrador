import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  connectionLimit: 10,
});

export async function query(sql, params) {
  let conn;
  try {
    conn = await pool.getConnection();
    return await conn.query(sql, params);
  } finally {
    if (conn) conn.release();
  }
}

export async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.ping();
    console.log('Conexion a MariaDB establecida correctamente');
  } finally {
    if (conn) conn.release();
  }
}
