import path from "path";
export function getCurrentDir() {
  const currDir = process.cwd();
  const dirName = path.basename(currDir);

  return dirName;
}
