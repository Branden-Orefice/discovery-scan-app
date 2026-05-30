import { useAllFindings } from "#/components/internal/dashboard/hooks/useAllFindings";
import StatCard from "#/components/internal/dashboard/StatCard";
import VulnerabilityTable from "#/components/internal/vulnerabilites/vulnerability-table/VulnerabilityTable";
import VulnerabilityTableColumns from "#/components/internal/vulnerabilites/vulnerability-table/VulnerabilityTableColumns";
import VulnerabilityTableTabs from "#/components/internal/vulnerabilites/vulnerability-table/VulnerabilityTableTabs";
import VulnerabilityCard from "#/components/internal/vulnerabilites/VulnerabilityCard";
import { getFindingCountBySeverity } from "#/utils/getFindingCountBySeverity";
import { useState } from "react";

const VulnerabilitiesPage = () => {
  const { findings, isLoading: isFindingsLoading } = useAllFindings();
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>(
    null,
  );

  const selectedFinding =
    findings.find((finding) => finding.id === selectedFindingId) ?? findings[0];

  const cricitalCount = getFindingCountBySeverity(findings, "critical");
  const highCount = getFindingCountBySeverity(findings, "high");
  const mediumCount = getFindingCountBySeverity(findings, "medium");
  const lowCount = getFindingCountBySeverity(findings, "low");
  const infoCount = getFindingCountBySeverity(findings, "info");

  return (
    <div className="mx-auto flex h-[calc(100vh-120px)] max-w-[1600px] w-full flex-col min-h-0">
      <div className="grid grid-cols-5">
        <StatCard
          title="critical"
          loading={isFindingsLoading}
          value={cricitalCount}
        />
        <StatCard title="high" loading={isFindingsLoading} value={highCount} />
        <StatCard
          title="medium"
          loading={isFindingsLoading}
          value={mediumCount}
        />
        <StatCard title="low" loading={isFindingsLoading} value={lowCount} />
        <StatCard title="info" loading={isFindingsLoading} value={infoCount} />
      </div>

      <div className="mt-4">
        <VulnerabilityTableTabs />
      </div>

      <div className="mt-4 flex min-h-0 flex-1 gap-4">
        <div className="min-h-0 flex-1 pb-4">
          <VulnerabilityTable
            columns={VulnerabilityTableColumns}
            data={findings}
            loading={isFindingsLoading}
            selectedFindingId={selectedFindingId}
            onSelectFinding={setSelectedFindingId}
          />
        </div>

        <VulnerabilityCard finding={selectedFinding} />
      </div>
    </div>
  );
};

export default VulnerabilitiesPage;
