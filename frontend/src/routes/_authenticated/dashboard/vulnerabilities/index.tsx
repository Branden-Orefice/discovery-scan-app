import VulnerabilitiesPage from "#/pages/internal/VulnerabilitiesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/dashboard/vulnerabilities/",
)({
  component: RouteComponent,
  staticData: { title: "Vulnerabilities" },
});

function RouteComponent() {
  return (
    <div>
      <VulnerabilitiesPage />
    </div>
  );
}
