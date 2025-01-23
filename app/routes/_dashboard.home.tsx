import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const ctx = Route.useRouteContext();

  return (
    <div className="container m-auto max-w-screen-xl px-2 py-4">
      {ctx.user?.email}
    </div>
  );
}
