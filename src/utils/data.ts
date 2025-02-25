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

const config = {
  directory: null as null | string,
  orm: <null | "drizzle" | "prisma">null,
  shadcn: false,
  authjs: false,
  name: "new-app",
  db: null as null | "postgres" | "neon-postgres" | "vercel-postgres",
  t3Env: false,
};

export type Config = typeof config;
export { Orm as ormOptions, config, db as dbOptions };
