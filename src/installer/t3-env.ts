import { getTemplateDir } from "../template";
import fs from "fs-extra";
import { addDeps } from "../utils/addDeps";
import path from "path";
import { logger } from "../utils/logger";

export async function t3EnvInstaller(
  projectDir: string,
  env: { db: boolean; auth: boolean }
) {
  const { t3env } = getTemplateDir();
  
  // Create destination path
  const destEnvPath = path.join(projectDir, "env.ts");
  
  try {
    // Read template env file
    const envContent = await fs.readFile(path.join(t3env, "env.ts"), "utf-8");
    
    let modifiedContent = envContent;

    if (env.db && !env.auth) {
      // Remove AUTH_SECRET related code
      modifiedContent = modifiedContent.replace(
        /AUTH_SECRET: z\.string\(\)\.min\(1\),\n*/g,
        ""
      ).replace(
        /AUTH_SECRET: process\.env\.AUTH_SECRET,\n*/g,
        ""
      );
    } else if (env.auth && !env.db) {
      // Remove DATABASE_URL related code
      modifiedContent = modifiedContent.replace(
        /DATABASE_URL: z\.string\(\)\.url\(\),\n*/g,
        ""
      ).replace(
        /DATABASE_URL: process\.env\.DATABASE_URL,\n*/g,
        ""
      );
    } else if (env.db && env.auth) {
      // Keep both configurations
      await fs.copy(path.join(t3env, "env.ts"), destEnvPath);
      await addDeps(["@t3-oss/env-nextjs", "zod"], false, projectDir);
      return;
    } 
    // Write modified content
    await fs.writeFile(destEnvPath, modifiedContent, "utf-8");
    
    // Install dependencies
    await addDeps(["@t3-oss/env-nextjs", "zod"], false, projectDir);

  } catch (error) {
    logger.error("Error installing t3-env:", error);
    throw error;
  }
}
