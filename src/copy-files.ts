import fs from "fs-extra";
import * as p from "@clack/prompts";
import { logger } from "./utils/logger";
import { getCurrentDir } from "./utils/getCurrentDir";
import { getTemplateDir } from "./tempate";
export async function copyFiles(dir: string) {
  const spinner = p.spinner();
  spinner.start("Copying filess..");
  const templateDir = await getTemplateDir();
  fs.copy(templateDir, dir).catch((err) => logger.error(err));
  spinner.stop();
}
