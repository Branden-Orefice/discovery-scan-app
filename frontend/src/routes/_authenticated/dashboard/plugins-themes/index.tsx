import PluginsAndThemesPage from "#/pages/internal/PluginsAndThemesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/dashboard/plugins-themes/",
)({
  component: RouteComponent,
  staticData: { title: "Plugins & Themes" },
});

function RouteComponent() {
  return (
    <div>
      <PluginsAndThemesPage />
    </div>
  );
}
