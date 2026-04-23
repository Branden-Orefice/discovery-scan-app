import { createFileRoute } from '@tanstack/react-router'
import VulnerabilitiesPage from "#/pages/internal/VulnerabilitiesPage.tsx";

export const Route = createFileRoute(
  '/_authenticated/dashboard/vulnerabilities',
)({
  component: RouteComponent,
  staticData: {title: "Vulnerabilities"}
})

function RouteComponent() {
  return <div><VulnerabilitiesPage /></div>
}
