import type { UserPackageManager } from "./package-manager";

const Orm = [
  {
    value: <"drizzle" | "prisma">"drizzle",
    label: "Drizzle",
    hint: "flexible ORM",
  },
  {
    value: <"drizzle" | "prisma">"prisma",
    label: "Prisma",
    hint: "simple ORM",
  },
  {
    value: null,
    label: "None",
    hint: "No ORM",
  },
];
type Db = {
  value: typeof config.db;
  label: string;
  hint: string;
};
const db: Db[] = [
  {
    value: "postgres",
    label: "Postgres",
    hint: "Local Postgres",
  },
  {
    value: "neon-postgres",
    label: "Neon Postgres",
    hint: "Serveless Neon Postgres",
  },
  {
    value: "vercel-postgres",
    label: "Vercel Postgres",
    hint: "Serveless Vercel Postgres",
  },
  {
    value: null,
    label: "None",
    hint: "No database selected",
  },
];
type Auth = {
  value: typeof config.auth;
  label: string;
  hint: string;
};
const auth: Auth[] = [
  {
    value: "auth_js",
    label: "Auth js",
    hint: "Authentication Library",
  },
  {
    value: null,
    label: "None",
    hint: "No Auth",
  },
];

const config = {
  directory: null as null | string,
  orm: <null | "drizzle" | "prisma">null,
  shadcn: false,
  auth: null as null | "auth_js",
  name: "new-app",
  db: null as null | "postgres" | "neon-postgres" | "vercel-postgres",
  t3Env: false,
  install: true,
  pkg: null as UserPackageManager | null,
};

export type Config = typeof config;
export { Orm as ormOptions, config, db as dbOptions, auth as authOptions };
