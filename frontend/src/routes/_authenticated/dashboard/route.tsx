import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from "#/components/internal/dashboard/layout/DashboardLayout.tsx";

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><DashboardLayout /></div>
}
