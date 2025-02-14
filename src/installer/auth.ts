import { getTemplateDir } from "../tempate";
import fs from "fs-extra";
import { addDeps } from "../utils/addDeps";

export async function authInstaller(projectDir: string) {
  const { auth_api,auth } = getTemplateDir();
  await fs.copy(auth_api, `${projectDir}/app`);
  await fs.copy(auth,projectDir)
  addDeps(["next-auth", "@auth/core"], false, projectDir);
}
