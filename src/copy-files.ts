import fs from "fs-extra";
import { logger } from "./utils/logger";
import { getTemplateDir } from "./tempate";
import type { Config } from "./utils/data";
export async function copyFiles(defaults: Config) {
  const { next, prisma, drizzle } = getTemplateDir();
  if (!defaults.directory) {
    logger.error("No directory found to add files");
    process.exit(1);
  }
  await fs.copy(next, defaults.directory);
  if (defaults.orm == "prisma") await fs.copy(prisma, defaults.directory);
  if (defaults.orm == "drizzle") await fs.copy(drizzle, defaults.directory);
  logger.success("Copied files");
}
