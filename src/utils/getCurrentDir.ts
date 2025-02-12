import path from "path";
import { logger } from "./logger";
import fs from "fs-extra";
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
    await fs.ensureDir(projectDir);
    return projectDir
  } catch {

    process.exit(1);
  }

}
