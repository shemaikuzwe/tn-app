import fs from "fs-extra";
import path from "path";
import type { PackageJson } from "type-fest";
export async function changePkgName(name: string, projectDir: string) {
  const pkgJson = fs.readJSONSync(
    path.join(projectDir),
    "package.json"
  ) as PackageJson;
  pkgJson.name = name;
}
