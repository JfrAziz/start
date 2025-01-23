import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: async ({ context }) => {
    if (!context.user) throw redirect({ to: "/" });
  },
  component: Outlet,
});
