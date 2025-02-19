import fs from "fs-extra";
async function main() {

  fs.copy("./src/template/next", "./next");
  fs.copy("./src/template/drizzle-db","./next")
  fs.copy("./src/template/shadcn","./next")
}
main()