import SettingsLayout from "#/components/internal/dashboard/layout/SettingsLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsLayout />;
}
