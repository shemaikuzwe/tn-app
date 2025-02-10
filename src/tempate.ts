import path from "path";
import { fileURLToPath } from "node:url";

export  function getTemplateDir() {
  const templatePackageName = "cli";
  const templatePackagePath = fileURLToPath(
    import.meta.resolve(templatePackageName)
  );
  const templateDir = path.dirname(templatePackagePath);
  const templatesDir = path.join(templateDir, "/template/next");
  return templatesDir;
}
