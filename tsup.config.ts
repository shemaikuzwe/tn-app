import { defineConfig } from "tsup";
import copy from "esbuild-plugin-copy";
const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: "esm",
  outDir: "dist",
  clean: true,
  target: "esnext",
  minify: true,
  onSuccess: isDev ? "node dist/index.js" : undefined,
  publicDir: "/src/template",
  plugins: [
    copy({
      assets: [
        {
          from: "./src/template/**/*",
          to: "/dist/template",
        },
      ],
    }),
  ],
});
