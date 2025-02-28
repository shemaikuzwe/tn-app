import { depsVersion, type Deps } from "./version";
import fs from "fs-extra";
import path from "path";
import { sortPackageJson } from "sort-package-json";
import type { PackageJson } from "type-fest";
export async function addDeps(deps: Deps[], dev: boolean, projectDir: string) {
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
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

export async function addScripts(
  projectDir: string,
  pkg: "prisma" | "drizzle"
) {
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJson;
  if (pkg == "prisma") {
    if (pkgJson.scripts) {
      pkgJson.scripts = {
        ...pkgJson.scripts,
        "db:push": "prisma db push",
        "db:studio": "prisma studio",
        "db:generate": "prisma generate",
        "db:migrate": "prisma migrate dev",
      };
    }
  }
  if (pkg == "drizzle") {
    if (pkgJson.scripts) {
      pkgJson.scripts = {
        ...pkgJson.scripts,
        "db:push": "drizzle-kit push",
        "db:studio": "drizzle-kit studio",
        "db:generate": "drizzle-kit generate",
        "db:migrate": "drizzle-kit migrate",
      };
    }
  }
  const sorted = sortPackageJson(pkgJson);
  fs.writeJSONSync(path.join(projectDir, "package.json"), sorted, {
    spaces: 2,
  });
}
