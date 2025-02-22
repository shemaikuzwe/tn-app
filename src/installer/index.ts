import fs from "fs-extra";
import { logger } from "../utils/logger";
import { getTemplateDir } from "../template";
import type { Config } from "../utils/data";
import { prismaInstaller } from "./prisma";
import { drizzleInstaller } from "./drizzle";
import { authInstaller } from "./auth";
import { shadcnInstaller } from "./shadcn";
import { changePkgName } from "../utils/changePkgName";
export async function copyFiles(defaults: Config) {
  const { next } = getTemplateDir();
  if (!defaults.directory) {
    logger.error("No directory found to add files");
    process.exit(1);
  }
  await fs.copy(next, defaults.directory);

  if (defaults.orm === "prisma") await prismaInstaller(defaults.directory);
  if (defaults.orm === "drizzle") {
    await drizzleInstaller(defaults.directory, defaults.db);
  }
  if (defaults.authjs) await authInstaller(defaults.directory);
  if (defaults.shadcn) await shadcnInstaller(defaults.directory);
  await changePkgName(defaults.directory);
  logger.success("Copied files");
}
