import { getTemplateDir } from "../template";
import fs from "fs-extra";
import path from "path";
import { logger } from "../utils/logger";

export async function envInstaller(
  projectDir: string, 
  config: { db: boolean; auth: boolean }
) {
  const { env } = getTemplateDir();
  const envPath = path.join(env, ".env");
  const destEnvPath = path.join(projectDir, ".env");
  const envExamplePath = path.join(env, ".env.example");
  const destEnvExamplePath = path.join(projectDir, ".env.example");

  try {
    // Read template env files
    const envContent = await fs.readFile(envPath, "utf-8");
    const envExampleContent = await fs.readFile(envExamplePath, "utf-8");
    
    let modifiedEnv = envContent;
    let modifiedEnvExample = envExampleContent;

    if (config.db && !config.auth) {
      // Remove AUTH_SECRET related variables
      modifiedEnv = modifiedEnv.replace(/AUTH_SECRET=.*\n?/g, "");
      modifiedEnvExample = modifiedEnvExample.replace(/AUTH_SECRET=.*\n?/g, "");
    } else if (config.auth && !config.db) {
      // Remove DATABASE_URL related variables
      modifiedEnv = modifiedEnv.replace(/DATABASE_URL=.*\n?/g, "");
      modifiedEnvExample = modifiedEnvExample.replace(/DATABASE_URL=.*\n?/g, "");
    } 
    // Write modified content
    await fs.writeFile(destEnvPath, modifiedEnv.trim() + "\n", "utf-8");
    await fs.writeFile(destEnvExamplePath, modifiedEnvExample.trim() + "\n", "utf-8");

    logger.success("Environment files created successfully");
  } catch (error) {
    logger.error("Error creating environment files:", error);
    throw error;
  }
}
