import { Command } from "commander";
import chalk from "chalk";
import * as readline from "node:readline";
import { logger } from "./utils/logger";

const program = new Command();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

program
  .version("1.0.0")
  .name("cli")
  .description("A simple CLI app using Commander and Chalk")
  .argument("[dir]", "The name of the application and directory")
  .argument(
    "--prisma [boolean]",
    "Initialize prisma",
    (value) => !!value && value !== "false"
  )
  .parse(process.argv);