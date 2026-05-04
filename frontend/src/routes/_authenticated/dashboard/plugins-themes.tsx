import { createFileRoute } from '@tanstack/react-router'
import PluginsAndThemesPage from "#/pages/internal/PluginsAndThemesPage.tsx";

export const Route = createFileRoute(
  '/_authenticated/dashboard/plugins-themes',
)({
  component: RouteComponent,
  staticData: {title: "Plugins & Themes"}
})

function RouteComponent() {
  return <div><PluginsAndThemesPage /></div>
}
