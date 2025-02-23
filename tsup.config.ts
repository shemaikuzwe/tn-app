import { defineConfig } from "tsup";
import fs from "fs-extra";
import path from "path";
export default defineConfig({
  clean: true,
  outDir: "dist",
  entry: ["src/index.ts"],
  format: "esm",
  minify: true,
  onSuccess: async () => {
    const distPath = path.join("dist", "template");
    await fs.mkdir(distPath, { recursive: true });
    await fs.copy("./src/template", distPath);
  },
});
