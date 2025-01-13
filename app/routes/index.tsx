import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="flex h-svh flex-col overflow-hidden bg-secondary/40 p-4">
      index page
    </main>
  );
}
