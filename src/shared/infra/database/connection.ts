import dotenv from 'dotenv';
import { Pool, QueryResult } from 'pg';

dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export async function query(query: string): Promise<QueryResult> {
  const client = await pool.connect();

  try {
    const response = await client.query(query);
    client.release();

    return response;
  } catch (error) {
    console.log(error);
    client.release();
    throw error;
  }
}
