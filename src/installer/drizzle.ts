import { getTemplateDir } from "../template";
import fs from "fs-extra";
import { addDeps, addScripts } from "../utils/addDeps";
import path from "path";

export async function drizzleInstaller(
  projectDir: string,
  db: "postgres" | "neon-postgres" | "vercel-postgres" | null
) {
  const { drizzle } = getTemplateDir();
  
  // Read template files
  const drizzleIndexPath = path.join(drizzle, "drizzle", "index.ts");
  const drizzleSchemaPath = path.join(drizzle, "drizzle", "schema.ts");
  const drizzleConfigPath = path.join(drizzle, "drizzle.config.ts");

  // Create destination paths
  const destDrizzleDir = path.join(projectDir, "drizzle");
  const destIndexPath = path.join(destDrizzleDir, "index.ts");
  const destSchemaPath = path.join(destDrizzleDir, "schema.ts");
  const destConfigPath = path.join(projectDir, "drizzle.config.ts");

  try {
    // Create drizzle directory
    await fs.ensureDir(destDrizzleDir);

    // Read and modify drizzle index file
    let drizzleContent = await fs.readFile(drizzleIndexPath, "utf-8");
    drizzleContent = drizzleContent.replace(
      'import { drizzle } from "drizzle-orm/neon-http";',
      db === "postgres"
        ? 'import { drizzle } from "drizzle-orm/node-postgres";'
        : db === "neon-postgres"
        ? 'import { drizzle } from "drizzle-orm/neon-http";'
        : 'import { drizzle } from "drizzle-orm/vercel-postgres";'
    );

    // Write modified files
    await fs.writeFile(destIndexPath, drizzleContent, "utf-8");
    await fs.copy(drizzleSchemaPath, destSchemaPath);
    await fs.copy(drizzleConfigPath, destConfigPath);

    // Install dependencies
    await addDeps(["drizzle-orm"], false, projectDir);
    await addDeps(["drizzle-kit"], true, projectDir);

    // Add database-specific dependencies
    if (db === "postgres") {
      await addDeps(["pg", "@types/pg"], false, projectDir);
    } else if (db === "vercel-postgres" || db === "neon-postgres") {
      await addDeps(["@vercel/postgres"], false, projectDir);
    }

    // Add drizzle scripts
    await addScripts(projectDir, "drizzle");

  } catch (error) {
    console.error("Error installing drizzle:", error);
    throw error;
  }
}
