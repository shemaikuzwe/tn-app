import { getTemplateDir } from "../template";
import fs from "fs-extra";
import { addDeps } from "../utils/addDeps";

export async function authInstaller(projectDir: string) {
  const { auth } = getTemplateDir();
  await fs.copy(auth, `${projectDir}/app`);
  await addDeps(["next-auth", "@auth/core"], false, projectDir);
}
