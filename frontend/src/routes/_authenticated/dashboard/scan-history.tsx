import { createFileRoute } from '@tanstack/react-router'
import ScanHistoryPage from "#/pages/internal/ScanHistoryPage.tsx";

export const Route = createFileRoute('/_authenticated/dashboard/scan-history')({
  component: RouteComponent,
  staticData: {title: "Scan History"}
})

function RouteComponent() {
  return <div><ScanHistoryPage /></div>
}
