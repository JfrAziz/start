import { auth } from "@/config/auth";
import { getEvent } from "vinxi/http";
import { createServerFn } from "@tanstack/start";

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({
    headers: getEvent().headers,
  });

  return session?.user;
});
