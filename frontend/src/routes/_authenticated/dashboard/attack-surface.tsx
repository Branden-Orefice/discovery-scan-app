import { createFileRoute } from '@tanstack/react-router'
import AttackSurfacePage from "#/pages/internal/AttackSurfacePage.tsx";

export const Route = createFileRoute(
  '/_authenticated/dashboard/attack-surface',
)({
  component: RouteComponent,
  staticData: {title: "Attack Surface"}
})

function RouteComponent() {
  return <div><AttackSurfacePage /></div>
}
