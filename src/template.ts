import path from "path";
import { fileURLToPath } from "node:url";

export function getTemplateDir() {
  const templatePackageName = "tn-app";
  const templatePackagePath = fileURLToPath(
    import.meta.resolve(templatePackageName)
  );
  const templateDir = path.dirname(templatePackagePath);
  const next = path.join(templateDir, "/template/next");
  const drizzle = path.join(templateDir, "/template/drizzle");
  const prisma = path.join(templateDir, "/template/prisma");
  const auth = path.join(templateDir, "/template/auth");
  const shadcn = path.join(templateDir, "/template/shadcn");

  return { next, drizzle, prisma, auth, shadcn };
}
