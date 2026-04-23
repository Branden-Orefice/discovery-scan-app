import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

if (!process.env.SUPABASE_DB_URL) {
  throw new Error("SUPABASE_DB_URL is not defined in environment variables");
}

export const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  max: 10,
  allowExitOnIdle: true,
});