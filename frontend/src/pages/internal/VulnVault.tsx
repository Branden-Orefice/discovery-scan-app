import { useWordfenceVulnVault } from "#/components/internal/dashboard/hooks/useWordfenceVulnVault";
import { useWordfenceVulnVaultSeverities } from "#/components/internal/dashboard/hooks/useWordfenceVulnVaultSeverities";
import StatCard from "#/components/internal/dashboard/StatCard";
import VulnVaultTable from "#/components/internal/vuln-vault/VulnVaultTable";
import VulnVaultTableColumns from "#/components/internal/vuln-vault/VulnVaultTableColumns";
import { useState } from "react";

const VulnVault = () => {
  const [page, setPage] = useState(0);
  const pageSize = 30;
  const { wordfenceVulnVault, totalCount, isLoading } = useWordfenceVulnVault(
    page,
    pageSize,
  );
  const { severities, isLoading: severitiesLoading } =
    useWordfenceVulnVaultSeverities();

  return (
    <div className="mx-auto flex h-[calc(100vh-120px)] max-w-[1600px] w-full flex-col min-h-0">
      <div className="grid grid-cols-5">
        <StatCard
          title="critical"
          loading={severitiesLoading}
          value={severities?.critical_count ?? 0}
        />
        <StatCard
          title="high"
          loading={severitiesLoading}
          value={severities?.high_count ?? 0}
        />
        <StatCard
          title="medium"
          loading={severitiesLoading}
          value={severities?.medium_count ?? 0}
        />
        <StatCard
          title="low"
          loading={severitiesLoading}
          value={severities?.low_count ?? 0}
        />
        <StatCard
          title="info"
          loading={severitiesLoading}
          value={severities?.info_count ?? 0}
        />
      </div>

      <div className="mt-4 h-[calc(100dvh-220px)]">
        <VulnVaultTable
          loading={isLoading}
          data={wordfenceVulnVault}
          columns={VulnVaultTableColumns}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default VulnVault;
