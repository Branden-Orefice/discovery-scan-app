import { createFileRoute } from '@tanstack/react-router'
import PortsAndServicesPage from "#/pages/internal/PortsAndServicesPage.tsx";

export const Route = createFileRoute(
  '/_authenticated/dashboard/ports-services',
)({
  component: RouteComponent,
  staticData: {title: "Ports & Services"}
})

function RouteComponent() {
  return <div><PortsAndServicesPage /></div>
}
