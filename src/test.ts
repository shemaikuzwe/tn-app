#!/usr/bin/env bun

import * as p from "@clack/prompts";
import chalk from "chalk";
import { options } from "./utils/data.ts";
import { installDependencies } from "./utils/installDeps.ts";
import { getCurrentDir } from "./utils/getCurrentDir.ts";
import { copyFiles } from "./copy-files.ts";
import { getUserPackageManger } from "./utils/package-manager.ts";

async function main() {
  p.intro(chalk.bgBlue(" Project Setup"));

  const project = await p.text({
    message: "What is your project named?",
    placeholder: getCurrentDir(),
    validate: (value) => {
      if (value.length === 0) return "Project name cannot be empty";
      if (value.length > 50) return "Project name is too long";
      return;
    },
    initialValue: getCurrentDir(),
  });

  // Handle user cancellation
  if (p.isCancel(project)) {
    p.outro(chalk.yellow("Setup cancelled. See you later!"));
    process.exit(0);
  }
  //mkdir(`${project}`, { recursive: true });
  const ORM = await p.select({
    message: "which ORM would you like to use",
    options,
  });

  if (p.isCancel(ORM)) {
    p.outro(chalk.yellow("Setup cancelled. See you later!"));
    process.exit(0);
  }

  const features = await p.multiselect({
    message: "Select additional libraries:",
    options: [
      { value: "shadcn_ui", label: "Shadcn ui", hint: "Ui Library" },
      {
        value: "next-auth",
        label: "Next auth",
        hint: "Authentication  Library",
      },
    ],
    required: false,
  });

  if (p.isCancel(features)) {
    p.outro(chalk.yellow("Setup cancelled. See you later!"));
    process.exit(0);
  }
  await copyFiles("./");
  const pkg = getUserPackageManger();
  const shouldProceed = await p.confirm({
    message: `Do you want to proceed with ${pkg} install?`,
  });
  if (shouldProceed) {
    await installDependencies("./", pkg);
  }
  p.outro(chalk.green(chalk.green("✨ Project setup complete!\n")));

  //try {
  // const deps = [...features];
  // await install(project, deps);
  // s.stop("Project configured successfully");

  // p.outro(
  //   chalk.green("✨ Project setup complete!\n") +
  //     chalk.dim(`run ${getUserPackageManger()} run dev`)
  // );
  //   } catch (error) {
  //     s.stop("Error occurred during setup");
  //     p.outro(chalk.red("Failed to complete setup. Please try again."));
  //     process.exit(1);
  //   }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
