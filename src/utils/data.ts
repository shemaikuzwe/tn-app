const dbOrm = [
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
];

const config = {
  directory: null as null | string,
  orm: <null | "drizzle" | "prisma">null,
  shadcn: false,
  authjs: false,
};

export type Config = typeof config;
export { dbOrm as options, config };
