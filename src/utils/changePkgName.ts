import fs from "fs-extra";
import path from "path";
import type { PackageJson } from "type-fest";
import { getDirName } from "./fs";
export async function changePkgName(projectDir: string) {
  const name = getDirName(projectDir);
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJson;
  pkgJson.name = name;
}
