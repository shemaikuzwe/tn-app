import path from "path";
import { logger } from "./logger";
import fs from "fs-extra";
import * as p from "@clack/prompts";
import chalk from "chalk";
export function getCurrentDir() {
  const currDir = process.cwd();
  const dirName = path.basename(currDir);
  return dirName;
}

export  function getDirName(dir:string){
  const dirName=path.basename(dir)
  return dirName  
}
export async function createDir(name: string) {
  const projectDir = path.resolve(process.cwd(), name);
  if (name !== "." && !/^[a-zA-Z0-9_-]+$/.test(name)) {
    logger.error(
      "Project name must contain only letters, numbers, hyphens, and underscores."
    );
    process.exit(1);
  }
   
  try {
    if ((await fs.exists(projectDir)) && name !== ".") {
      const overWrite = await p.confirm({
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
    if (!(await isDirectoryEmpty(projectDir))) {
      const deleteDir = await p.confirm({
        message:
          "It looks like your directory contains files would you like to delete them",
        initialValue: false,
      });
      if (deleteDir) {
        await fs.emptyDir(projectDir);
      } else {
        p.outro(chalk.yellow("Setup cancelled. See you later!"));
        process.exit(1);
      }
    }
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
