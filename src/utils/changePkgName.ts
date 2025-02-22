import fs from "fs-extra";
import path from "path";
import type { PackageJson } from "type-fest";
import { getDirName } from "./fs";
import { logger } from "./logger";
import sortPackageJson from "sort-package-json";
export async function changePkgName(projectDir: string) {
  const name = getDirName(projectDir);
  logger.info(name);
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJson;
  pkgJson.name = name;
  const sorted = sortPackageJson(pkgJson);
  fs.writeJSONSync(path.join(projectDir, "package.json"), sorted, {
    spaces: 2,
  });
}
