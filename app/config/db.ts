import postgres from "postgres";
import { env } from "@/config/env";
import * as schema from "./schema";
import type { Config } from "drizzle-kit";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";

declare global {
  // eslint-disable-next-line no-var
  var __db__: PostgresJsDatabase<typeof schema>;
}

let db: PostgresJsDatabase<typeof schema>;

/**
 * this is needed because in development we don't want to restart
 * the server with every change, but we want to make sure we don't
 * create a new connection to the DB with every change either.
 * in production, we'll have a single connection to the DB.
 */
if (process.env.NODE_ENV === "development") {
  if (!global.__db__) {
    global.__db__ = drizzle(postgres(process.env.DATABASE_URL!), {
      schema: schema,
    });
  }

  db = global.__db__;
} else {
  db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
}

const config = {
  out: "./migrations",
  dialect: "postgresql",
  schema: "./app/config/schema.ts",
  dbCredentials: { url: env.DATABASE_URL },
} satisfies Config;

export { db };

export default config;
