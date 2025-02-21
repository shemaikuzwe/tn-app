import { getTemplateDir } from "../template";
import fs from "fs-extra";
import { addDeps } from "../utils/addDeps";

export async function shadcnInstaller(projectDir: string) {
  const { shadcn } = getTemplateDir();
  await fs.copy(shadcn, projectDir);
  await addDeps(
    [
      "class-variance-authority",
      "clsx",
      "lucide-react",
      "@radix-ui/react-slot",
    ],
    true,
    projectDir
  );
}
