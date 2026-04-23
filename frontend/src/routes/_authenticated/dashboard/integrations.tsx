import { createFileRoute } from '@tanstack/react-router'
import IntegrationsPage from "#/pages/internal/IntegrationsPage.tsx";

export const Route = createFileRoute('/_authenticated/dashboard/integrations')({
  component: RouteComponent,
  staticData: {title: "Integrations"}
})

function RouteComponent() {
  return <div><IntegrationsPage /></div>
}
