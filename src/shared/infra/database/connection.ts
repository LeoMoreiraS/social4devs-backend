import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export async function query(query: string): Promise<any> {
  try {
    const client = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: 5432,
    });

    await client.connect();
    const response = await client.query(query);
    client.end();

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
