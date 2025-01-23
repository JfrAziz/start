import tailwind from "@/styles/globals.css?url";

import { getUser } from "@/handler/user";
import { RouterContext } from "@/router";
import { Meta, Scripts } from "@tanstack/start";
import { DevTools } from "@/components/ui/dev-tools";
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router";

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    context.user = await getUser();

    return context;
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Start",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
      {
        rel: "stylesheet",
        href: tailwind,
      },
    ],
    scripts: import.meta.env.PROD
      ? []
      : [
          {
            type: "module",
            children: `
              import RefreshRuntime from "/_build/@react-refresh"
              RefreshRuntime.injectIntoGlobalHook(window)
              window.$RefreshReg$ = () => {}
              window.$RefreshSig$ = () => (type) => type
            `,
          },
        ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <html suppressHydrationWarning>
      <head>
        <Meta />
      </head>
      <body className="dark bg-bg text-fg">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <DevTools />
      </body>
    </html>
  );
}

function NotFound() {
  return <div>Not Found</div>;
}
