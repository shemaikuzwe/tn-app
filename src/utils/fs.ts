import path from "path";
import { logger } from "./logger";
import fs from "fs-extra";
import * as p from "@clack/prompts";
export function getCurrentDir() {
  const currDir = process.cwd();
  const dirName = path.basename(currDir);

  return dirName;
}

export async function createDir(name: string) {
  const projectDir = path.resolve(process.cwd(), name);
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    logger.error(
      "Project name must contain only letters, numbers, hyphens, and underscores."
    );
    process.exit(1);
  }

  try {
    if ((await fs.exists(projectDir)) && name !== ".") {
      const overWrite = p.confirm({
        message: `Would you like to overwrite ${name}`,
        initialValue: false,
      });
      if (!overWrite) {
        p.outro("Aborting project creation.");
        process.exit(1);
      } else {
        await fs.remove(projectDir);
      }
    }
    await fs.ensureDir(projectDir);
    return projectDir;
  } catch {
    process.exit(1);
  }
}

async function isDirectoryEmpty(dir: string) {
  try {
    const files = await fs.readdir(dir);
    return files.length === 0;
  } catch (errr) {
    logger.error(errr);
    process.exit(1);
  }
}
