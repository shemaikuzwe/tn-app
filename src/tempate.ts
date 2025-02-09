import path from "path";
import { fileURLToPath } from "node:url";

const __fileName = fileURLToPath(import.meta.url);
const dirName = path.basename(__fileName);

export async function getTemplateDir() {
  const templatePackageName = "cli";
  const templatePackagePath = fileURLToPath(
    await import.meta.resolve(templatePackageName)
  );
  const templateDir = path.dirname(templatePackagePath);
  const templatesDir = path.join(templateDir, "/template/next");
  return templatesDir;
}
