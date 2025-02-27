#!/usr/bin/env node

import { Command } from "commander";
import { config } from "./utils/data";
import { noaCli } from "./cli";
import { createDir } from "./utils/fs";
import * as p from "@clack/prompts";
import chalk from "chalk";
import { VERSION } from "./template";
import { getUserPackageManger } from "./utils/package-manager";
async function main() {
  const program = new Command();
  program
    .version(VERSION, "-V,--v", "Output the current version of create-tn-app")
    .name("tn-app")
    .description(
      "TN app,quickly spin up next js project with the stack you love"
    )
    .argument("[dir]", "The name of the application and directory")
    .option(
      "-O, --orm <value>",
      "initialize with prisma or drizzle ORM installed"
    )
    .option("-S,--shadcn", "Initialize  with shadcn ui installed")
    .option(
      "-D, --db <value>",
      "Initialize with Database installed eg: postgres"
    )
    .option(
      "-A,--auth <value>",
      "Initialize  with Auth installed eg auth_js ",
      undefined
    )
    .option("--no-install", "Skip installation process")
    .option("--t3-env", "Initialize with t3-env installed")
    .option("--use <package-manager>", "Explicitly specify npm, pnpm, or bun");
  let parsed: any;

  try {
    parsed = program.parse(process.argv);
    const options = program.opts();
    const [dir] = program.args;

    if (dir) {
      const projectDir = await createDir(dir);
      if (projectDir) {
        config.directory = projectDir;
      }
    }
    config.shadcn = options.shadcn;
    config.auth = options.auth == "auth_js" ? "auth_js" : null;
    config.orm =
      options.orm == "prisma"
        ? "prisma"
        : options.orm == "drizzle"
        ? "drizzle"
        : null;
    config.db =
      options.db == "postgres"
        ? "postgres"
        : options.db == "neon postgres"
        ? "neon-postgres"
        : options.db == "vercel-postgres"
        ? "vercel-postgres"
        : null;
    config.t3Env = options.t3Env;
    config.install = options.install;
    // options.use == "npm"
    //   ? config.pkg == "npm"
    //   : options.use == "bun"
    //   ? config.pkg == "bun"
    //   : options.use == "pnpm"
    //   ? config.pkg == "pnpm"
    //   : options.use == "yarn" && config.pkg == "yarn";
    // p.intro(chalk.bgBlue("TN-APP"));
    
    await noaCli(config);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
