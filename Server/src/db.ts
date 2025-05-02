// Server/src/db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Ensure your DATABASE_URL is set in .env
const client = postgres(process.env.DATABASE_URL!, {
  ssl: 'prefer', // optional: useful for deployment (e.g., Railway, Supabase)
});

export const db = drizzle(client);

