import { getTemplateDir } from "../tempate";
import fs from "fs-extra";
import { addDeps } from "../utils/addDeps";
export async function prismaInstaller(projectDir: string) {
  const { prisma } = getTemplateDir();
  await fs.copy(prisma, projectDir);
  addDeps(["@prisma/client"], false, projectDir);
  addDeps(["prisma"], true, projectDir);
}
