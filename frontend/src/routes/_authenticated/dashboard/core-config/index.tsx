import CoreAndConfigPage from "#/pages/internal/CoreAndConfigPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/core-config/")({
  component: RouteComponent,
  staticData: { title: "Core & Config" },
});

function RouteComponent() {
  return (
    <div>
      <CoreAndConfigPage />
    </div>
  );
}
