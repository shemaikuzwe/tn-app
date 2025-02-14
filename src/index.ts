#!/usr/bin/env bun

import { Command } from "commander";
import { config } from "./utils/data";
import { noaCli } from "./cli";
import { createDir } from "./utils/fs";
import * as p from "@clack/prompts";
import chalk from "chalk";
async function main() {
  const program = new Command();

  program
    .version(
      "1.0.0",
      "-V,--v",
      "Output the current version of create-noa-stack"
    )
    .name("noa-stack")
    .description(
      "NOA stack,quickly spin up next js project with the stack you love"
    )
    .argument("[dir]", "The name of the application and directory")
    .option("-O, --orm <value>", "ORM you want to use prisma or drizzle")
    .option(
      "-S,--shadcn <boolean>",
      "Initialize  with shadcn ui installed",
      false
    )
    .option(
      "-A,--authjs <boolean>",
      "Initialize  with Auth js installed",
      false
    );

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
    config.authjs = options.authjs;
    config.orm =
      options.orm == "prisma"
        ? "prisma"
        : options.orm == "drizzle"
        ? "drizzle"
        : null;
    p.intro(chalk.bgBlue(" Project Setup"));
    await noaCli(config);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
