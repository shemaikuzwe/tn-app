import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/drizzle/schema";
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
type User = typeof schema.users.$inferSelect;
