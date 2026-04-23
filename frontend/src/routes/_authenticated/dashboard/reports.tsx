import { createFileRoute } from '@tanstack/react-router'
import ReportsPage from "#/pages/internal/ReportsPage.tsx";

export const Route = createFileRoute('/_authenticated/dashboard/reports')({
  component: RouteComponent,
  staticData: {title: "Reports"}
})

function RouteComponent() {
  return <div><ReportsPage /></div>
}
