import path from "path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
const distUrl = fileURLToPath(import.meta.resolve("create-tn-app"));
export const ROOTDIR = path.join(distUrl, "../../");
const packageJsonPath = path.join(ROOTDIR, "package.json");
const packageJsonContent = fs.readJSONSync(packageJsonPath);
export const VERSION = packageJsonContent.version ?? "1.0.0";

export function getTemplateDir() {
  const distPath = path.dirname(distUrl);
  const next = path.join(distPath, "/template/next");
  const drizzle = path.join(distPath, "/template/drizzle");
  const prisma = path.join(distPath, "/template/prisma");
  const auth = path.join(distPath, "/template/auth");
  const shadcn = path.join(distPath, "/template/shadcn");
  const t3env= path.join(distPath, "/template/t3-env");
  const env= path.join(distPath, "/template/env");
  return { next, drizzle, prisma, auth, shadcn,t3env,env };
}
