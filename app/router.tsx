import { User } from "@/config/auth";
import { user } from "@/config/schema";
import { routeTree } from "./route-tree.gen";
import { QueryClient } from "@tanstack/react-query";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";

export interface RouterContext {
  user?: User | typeof user.$inferSelect;

  queryClient: QueryClient;
}

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });

  const routerContext: RouterContext = {
    queryClient,
  };

  const router = createTanStackRouter({
    routeTree,
    context: routerContext,
  });

  return routerWithQueryClient(router, queryClient);
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
