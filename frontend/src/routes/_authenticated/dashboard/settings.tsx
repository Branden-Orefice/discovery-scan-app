import { createFileRoute } from '@tanstack/react-router'
import SettingsPage from "#/pages/internal/SettingsPage.tsx";

export const Route = createFileRoute('/_authenticated/dashboard/settings')({
  component: RouteComponent,
  staticData: {title: "Settings"}
})

function RouteComponent() {
  return <div><SettingsPage /></div>
}
