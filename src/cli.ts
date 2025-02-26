import * as p from "@clack/prompts";
import chalk from "chalk";
import {
  authOptions,
  dbOptions,
  ormOptions,
  type Config,
} from "./utils/data.ts";
import { installDependencies } from "./utils/installDeps.ts";
import { createDir, getCurrentDir } from "./utils/fs.ts";
import { copyFiles } from "./installer/index.ts";
import { getUserPackageManger } from "./utils/package-manager.ts";
import { logger } from "./utils/logger.ts";

export async function noaCli(defaults: Config) {
  if (defaults.directory == null) {
    const project = await p.text({
      message: "What is your project named?",
      placeholder: getCurrentDir(),
      validate: (value) => {
        if (value.length === 0) return "Project name cannot be empty";
        if (value.length > 50) return "Project name is too long";
        if (!/^[a-zA-Z0-9_-]+$/.test(value))
          return "Project name must contain only letters, numbers, hyphens, and underscores.";
        return;
      },
    });

    if (p.isCancel(project)) {
      p.outro(chalk.yellow("Setup cancelled. See you later!"));
      process.exit(0);
    }
    const projectDir = await createDir(project);
    defaults.directory = projectDir;
  }
  if (!defaults.orm) {
    const ORM = await p.select({
      message: "which ORM would you like to use",
      options: ormOptions,
    });

    if (p.isCancel(ORM)) {
      p.outro(chalk.yellow("Setup cancelled. See you later!"));
      process.exit(0);
    }
    defaults.orm = ORM;
  }
  if (!defaults.db && defaults.orm) {
    const Db = await p.select({
      message: "which Database would you like to use",
      options: dbOptions,
    });

    if (p.isCancel(Db)) {
      p.outro(chalk.yellow("Setup cancelled. See you later!"));
      process.exit(0);
    }
    defaults.db = Db;
  }
  if (!defaults.auth) {
    const auth = await p.select({
      message: "which Auth  would you like to use",
      options: authOptions,
    });

    if (p.isCancel(auth)) {
      p.outro(chalk.yellow("Setup cancelled. See you later!"));
      process.exit(0);
    }
    defaults.auth = auth;
  }
  const shadcn = await p.confirm({
    message: "Would you like to initiliaze shadcn ui?",
    initialValue: false,
  });
  if (p.isCancel(shadcn)) {
    p.outro(chalk.yellow("Setup cancelled. See you later!"));
    process.exit(0);
  }
  defaults.shadcn = shadcn;
  if (defaults.auth || defaults.orm) {
    const t3Env = await p.confirm({
      message: "Would you like to use t3-env?",
      initialValue: false,
    });
    if (p.isCancel(t3Env)) {
      p.outro(chalk.yellow("Setup cancelled. See you later!"));
      process.exit(0);
    }
    defaults.t3Env = t3Env;
  }
  await copyFiles(defaults);
  const pkg = getUserPackageManger();
  const shouldProceed = await p.confirm({
    message: `Do you want to proceed with ${pkg} install?`,
  });
  if (shouldProceed) {
    await installDependencies(defaults.directory, pkg);
  }
  p.outro(chalk.green("Project setup success!"));
  process.exit(0);
}
