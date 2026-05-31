import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const DB = process.env.DATABASE_URL || "";

const sql = neon(DB);
export const db = drizzle(sql);