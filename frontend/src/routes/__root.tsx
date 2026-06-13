import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";
import { TanStackDevtools } from "@tanstack/react-devtools";
import "@/styles.css";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import type { QueryClient } from "@tanstack/react-query";
import PageNotFound from "#/pages/misc/PageNotFound";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: PageNotFound,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster position="bottom-right" gutter={10} />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  );
}
