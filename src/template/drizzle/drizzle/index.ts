import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/drizzle/index.ts";

const db = drizzle(process.env.DATABASE_URL!, { schema });
type User = typeof schema.users.$inferSelect;

export { db,type User };
