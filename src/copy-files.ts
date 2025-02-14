import fs from "fs-extra";
import { logger } from "./utils/logger";
import { getTemplateDir } from "./tempate";
import type { Config } from "./utils/data";
import { prismaInstaller } from "./installer/prisma";
export async function copyFiles(defaults: Config) {
  const { next } = getTemplateDir();
  if (!defaults.directory) {
    logger.error("No directory found to add files");
    process.exit(1);
  }
  await fs.copy(next, defaults.directory);
  if (defaults.orm === "prisma") await prismaInstaller(defaults.directory);
  logger.success("Copied files");
}
