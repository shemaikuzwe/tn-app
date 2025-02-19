import path from "path";
import { fileURLToPath } from "node:url";

export function getTemplateDir() {
  const pkg = "noa-stack";
  const pkgPath = fileURLToPath(import.meta.resolve(pkg));
  const templateDir = path.dirname(pkgPath);
  const next = path.join(templateDir, "/template/next");
  const drizzle = path.join(templateDir, "/template/drizzle");
  const prisma = path.join(templateDir, "/template/prisma");
  const auth_api = path.join(templateDir, "/template/auth-api");
  const auth = path.join(templateDir, "/template/authjs");
  const shadcn = path.join(templateDir, "/template/shadcn");
  return { next, drizzle, prisma, auth_api, auth, shadcn };
}
