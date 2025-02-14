import * as p from "@clack/prompts";
import chalk from "chalk";
import { options, type Config } from "./utils/data.ts";
import { installDependencies } from "./utils/installDeps.ts";
import { createDir, getCurrentDir } from "./utils/fs.ts";
import { copyFiles } from "./installer/index.ts";
import { getUserPackageManger } from "./utils/package-manager.ts";
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
      options,
    });

    if (p.isCancel(ORM)) {
      p.outro(chalk.yellow("Setup cancelled. See you later!"));
      process.exit(0);
    }
    defaults.orm = ORM;
  }

  const features = await p.multiselect({
    message: "Select additional libraries:",
    options: [
      { value: "shadcn_ui", label: "Shadcn ui", hint: "Ui Library" },
      {
        value: "auth_js",
        label: "Auth js",
        hint: "Authentication  Library",
      },
    ],
    required: false,
    initialValues: [
      defaults.shadcn ? "shadcn_ui" : undefined,
      defaults.authjs ? "auth_js" : undefined,
    ],
  });

  if (p.isCancel(features)) {
    p.outro(chalk.yellow("Setup cancelled. See you later!"));
    process.exit(0);
  }
  const selectFeatures = features.filter(Boolean);
  defaults.authjs = selectFeatures.includes("auth_js");
  defaults.shadcn = selectFeatures.includes("shadcn_ui");

  await copyFiles(defaults);
  const pkg = getUserPackageManger();
  const shouldProceed = await p.confirm({
    message: `Do you want to proceed with ${pkg} install?`,
  });
  if (shouldProceed) {
    await installDependencies("./", pkg);
  }else{
    p.outro(chalk.green(chalk.green("✨ Project setup complete!\n")));
    process.exit(0);
  }
}
