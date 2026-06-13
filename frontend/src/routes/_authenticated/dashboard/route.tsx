import { createFileRoute } from "@tanstack/react-router";
import DashboardLayout from "#/components/internal/dashboard/layout/DashboardLayout.tsx";
import PageNotFoundAuthenticated from "#/pages/misc/PageNotFoundAuthenticated";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
  notFoundComponent: PageNotFoundAuthenticated,
});

function RouteComponent() {
  return (
    <div>
      <DashboardLayout />
    </div>
  );
}
