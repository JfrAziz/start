import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "@tanstack/start/config";

const app = defineConfig({
  server: {
    preset: "bun",
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
  tsr: {
    generatedRouteTree: "./app/route-tree.gen.ts",
  },
  routers: {
    public: {
      dir: "./app/public",
    },
    api: {
      entry: "./app/entry-api.ts",
    },
    ssr: {
      entry: "./app/entry-server.ts",
    },
    client: {
      entry: "./app/entry-client.tsx",
    },
  },
});

export default app;
