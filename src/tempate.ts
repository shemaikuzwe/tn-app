import path from "path";
import { fileURLToPath } from "node:url";

export function getTemplateDir() {
  const templatePackageName = "noa-stack";
  const templatePackagePath = fileURLToPath(
    import.meta.resolve(templatePackageName)
  );
  const templateDir = path.dirname(templatePackagePath);
  const next = path.join(templateDir, "/template/next");
  const drizzle = path.join(templateDir, "/template/drizzle");
  const prisma = path.join(templateDir, "/template/prisma");
  const auth_api = path.join(templateDir, "/template/auth-api");
  const auth = path.join(templateDir, "/template/authjs");
  return { next, drizzle, prisma, auth_api, auth };
}
