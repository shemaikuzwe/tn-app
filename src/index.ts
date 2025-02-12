#!/usr/bin/env bun

import { Command } from "commander";
import { config } from "./utils/data";
import { noaCli } from "./cli";
import { createDir } from "./utils/getCurrentDir";

async function main() {
  const program = new Command();

  program
    .version("1.0.0")
    .name("noa-stack")
    .description(
      "NOA stack,quickly spin up next js project with the stack you love"
    )
    .argument("[dir]", "The name of the application and directory")
    .option("-O, --orm <value>", "ORM you want to use prisma or drizzle")
    .option("-S,--shadcn <boolean>", "Add shadcn ui", false)
    .option("-A,--authjs <boolean>", "Add authjs for authentication", false);

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

    await noaCli(config);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
