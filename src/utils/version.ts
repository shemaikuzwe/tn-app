import { execa } from "execa";
import { logger } from "./logger";
async function getLatestVersion(packageName: string) {
  try {
    const result = await execa("npm", ["view", packageName, "version"]);
    return result.stdout;
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}
export const depsVersion = {
  // NextAuth.js
  "next-auth": "5.0.0-beta.25",
  "@auth/prisma-adapter": "^2.7.2",
  "@auth/drizzle-adapter": "^1.7.2",
  "@auth/core": "^0.37.4",
  // Prisma
  prisma: "^5.14.0",
  "@prisma/client": "^5.14.0",
  // Drizzle
  "drizzle-kit": "^0.24.0",
  "drizzle-orm": "^0.33.0",
  pg: "^8.13.3",
  "@vercel/postgres": "0.10.0",
  "@types/pg": "^8.11.11",
  "@neondatabase/serverless": "^0.10.4",
  //shadcn ui
  "lucide-react": "^0.474.0",
  clsx: "^2.1.1",
  "class-variance-authority": "^0.7.1",
  "@radix-ui/react-slot": "^1.1.1",

  //t3env
  "@t3-oss/env-nextjs": "^0.12.0",
  zod: "^3.24.2",
} as const;
export type Deps = keyof typeof depsVersion;
