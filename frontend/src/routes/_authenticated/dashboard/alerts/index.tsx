import AlertsPage from "#/pages/internal/AlertsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/alerts/")({
  component: RouteComponent,
  staticData: { title: "Alerts" },
});

function RouteComponent() {
  return (
    <div>
      <AlertsPage />
    </div>
  );
}
