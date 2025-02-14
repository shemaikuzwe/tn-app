import { depsVersion, type Deps } from "./version";
import fs from "fs-extra";
import path from "path";
import { sortPackageJson } from "sort-package-json";
import type { PackageJson } from "type-fest";
export async function addDeps(deps: Deps[], dev: boolean, projectDir: string) {
  const pkgJson = fs.readJSONSync(
    path.join(projectDir,"package.json") 
  ) as PackageJson;
  for (const dep of deps) {
    const version = depsVersion[dep];
    if (dev && pkgJson.devDependencies) {
      pkgJson.devDependencies[dep] = version;
    } else if (pkgJson.dependencies) {
      pkgJson.dependencies[dep] = version;
    }
  }
  const sorted = sortPackageJson(pkgJson);
  fs.writeJSONSync(path.join(projectDir, "package.json"), sorted, {
    spaces: 2,
  });
}
