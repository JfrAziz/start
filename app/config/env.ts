import { z } from "zod";

const schema = z.object({
  /** public */
  VITE_APP_NAME: z.string(),
  VITE_APP_BASE_URL: z.string(),

  /** private */
  AUTH_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

const parseENV = (env: unknown) => {
  const result = schema.safeParse(env);

  if (result.error) throw new Error("Invalid environment variables");

  return result.data;
};

/**
 * we need to store this as global object,
 * so we can reuse the same object across
 * multiple requests in node js runtime,
 * or in serverless runtime for each requests
 */
declare global {
  var __env__: z.infer<typeof schema>;
}

export const env = parseENV(process.env);
