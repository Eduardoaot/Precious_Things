import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// El .env vive junto al server, no importa desde qué carpeta se arranque.
dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../.env') });
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bd_laquinta',
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
});
