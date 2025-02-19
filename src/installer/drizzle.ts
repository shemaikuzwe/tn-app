import { getTemplateDir } from "../tempate";
import fs from "fs-extra";
import { addDeps } from "../utils/addDeps";
export async function drizzlerInstaller(projectDir: string) {
  const { drizzle } = getTemplateDir();
  await fs.copy(drizzle, projectDir);
  await addDeps(["drizzle-orm", "@neondatabase/serverless"], false, projectDir);
  await addDeps(["drizzle-kit"], true, projectDir);
}
