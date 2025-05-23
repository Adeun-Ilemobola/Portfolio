import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();


if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}


export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
