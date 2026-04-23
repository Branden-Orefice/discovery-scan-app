import { createFileRoute } from '@tanstack/react-router'
import AlertsPage from "#/pages/internal/AlertsPage.tsx";

export const Route = createFileRoute('/_authenticated/dashboard/alerts')({
  component: RouteComponent,
  staticData: {title: "Alerts"}
})

function RouteComponent() {
  return <div><AlertsPage /></div>
}
