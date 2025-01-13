import { env } from "./env";
import { ulid } from "ulid";
import { db } from "@/config/db";
import { betterAuth } from "better-auth";
import * as schema from "@/config/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  secret: env.AUTH_SECRET,
  baseURL: env.VITE_APP_BASE_URL,
  advanced: { generateId: () => ulid() },
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: false,
    schema: {
      user: schema.user,
      account: schema.user_account,
      session: schema.user_session,
      verification: schema.user_verification,
    },
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
      },
      organization: {
        type: "string",
      },
    },
  },
});

/**
 * User type from better auth
 */
export type User = typeof auth.$Infer.Session.user;
