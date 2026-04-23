import { createFileRoute } from '@tanstack/react-router'
import DashboardHome from "#/pages/internal/HomePage.tsx";


export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: RouteComponent,
  staticData: {title: "Dashboard"}
})

function RouteComponent() {
  return <div><DashboardHome /></div>
}
