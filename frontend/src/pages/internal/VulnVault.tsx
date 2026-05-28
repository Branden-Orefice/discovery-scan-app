import { useWordfenceVulnVault } from "#/components/internal/dashboard/hooks/useWordfenceVulnVault";
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

  return (
    <div>
      <div className="grid grid-cols-5">
        <StatCard title="critical" value={1} />
        <StatCard title="high" value={1} />
        <StatCard title="medium" value={1} />
        <StatCard title="low" value={1} />
        <StatCard title="info" value={1} />
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
