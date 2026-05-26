import ScanHistoryPage from "#/pages/internal/ScanHistoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/scan-history/")(
  {
    component: RouteComponent,
    staticData: { title: "Scan History" },
  },
);

function RouteComponent() {
  return (
    <div>
      <ScanHistoryPage />
    </div>
  );
}
