import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

export const pg = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});
