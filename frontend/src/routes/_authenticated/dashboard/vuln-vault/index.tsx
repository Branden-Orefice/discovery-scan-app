import VulnVault from "#/pages/internal/VulnVault";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/vuln-vault/")({
  component: RouteComponent,
  staticData: { title: "Vuln-Vault" },
});

function RouteComponent() {
  return (
    <div>
      <VulnVault />
    </div>
  );
}
