import path from "path";
import { fileURLToPath } from "node:url";

export function getTemplateDir() {
  // const templatePackageName = "noa-stack";
  // const templatePackagePath = fileURLToPath(
  //   import.meta.resolve(templatePackageName)
  // );
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templateDir = path.join(__dirname, "..", "/src/template");
  
  return {
    next: path.join(templateDir, "next"),
    drizzle: path.join(templateDir, "drizzle"),
    prisma: path.join(templateDir, "prisma"),
    auth_api: path.join(templateDir, "auth-api"),
    auth: path.join(templateDir, "authjs"),
    shadcn: path.join(templateDir, "shadcn")
  };
}
