import { auth } from "@/config/auth";
import { createMiddleware } from "@tanstack/start";
import { getEvent, setResponseStatus } from "vinxi/http";

export const authorized = createMiddleware().server(async ({ next }) => {
  const user = await auth.api.getSession({
    headers: getEvent().headers,
  });

  if (!user) {
    setResponseStatus(401);

    throw new Error("Unauthorized");
  }

  return next({ context: { user: user.user } });
});
