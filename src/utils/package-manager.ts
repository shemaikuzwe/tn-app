async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export type UserPackageManager = "npm" | "pnpm" | "yarn" | "bun";
const getUserPackageManger = ():UserPackageManager => {
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    }
    if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    }
    if (userAgent.startsWith("bun")) {
      return "bun";
    } else {
      return "npm";
    }
  }
  return "npm";
};
export { sleep, getUserPackageManger };
