import { getTemplateDir } from "../template";
import fs from "fs-extra";
import path from "path";
import { addDeps } from "../utils/addDeps";
import { logger } from "../utils/logger";

export async function authInstaller(
  projectDir: string,
  orm = "prisma" as "prisma" | "drizzle" | null
) {
  const { auth } = getTemplateDir();
  const authApi = path.join(auth, "api");
  const authPath = path.join(projectDir, "app");
  const authroute = path.join(
    projectDir,
    "app",
    "api",
    "auth",
    "[...nextauth]"
  );

  try {
    // Create base auth content
    let authContent = `import NextAuth from "next-auth";
`;

    // Add ORM-specific imports and adapter
    if (orm === "prisma") {
      authContent += `import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
});`;
      await addDeps(["@auth/prisma-adapter"], false, projectDir);
    } else if (orm === "drizzle") {
      authContent += `import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzle";
import { users, accounts } from "@/drizzle/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  providers: [],
});`;
      await addDeps(["@auth/drizzle-adapter"], false, projectDir);
    }
    // Ensure directory exists
    await fs.ensureDir(authPath);

    // Write route file
    await fs.writeFile(path.join(authPath, "auth.ts"), authContent, "utf-8");

    // Copy other auth-related files
    await fs.copy(authApi, authroute);

    // Install common dependencies
    await addDeps(["next-auth", "@auth/core"], false, projectDir);
  } catch (error) {
    logger.error("Error installing auth:", error);
    throw error;
  }
}
