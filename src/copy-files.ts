import fs from "fs-extra";
import { logger } from "./utils/logger";
import { getTemplateDir } from "./tempate";
export async function copyFiles(dir: string) {
  const templateDir = getTemplateDir();
  await fs.copy(templateDir, dir);
  logger.success("Copied files");
}
