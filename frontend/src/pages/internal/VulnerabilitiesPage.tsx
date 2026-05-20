import { useAllFindings } from "#/components/internal/dashboard/hooks/useAllFindings";
import StatCard from "#/components/internal/dashboard/StatCard";
import VulnerabilityTable from "#/components/internal/vulnerabilites/vulnerability-table/VulnerabilityTable";
import VulnerabilityTableColumns from "#/components/internal/vulnerabilites/vulnerability-table/VulnerabilityTableColumns";
import VulnerabilityTableTabs from "#/components/internal/vulnerabilites/vulnerability-table/VulnerabilityTableTabs";
import VulnerabilityCard from "#/components/internal/vulnerabilites/VulnerabilityCard";
import { getFindingCountBySeverity } from "#/utils/getFindingCountBySeverity";

const VulnerabilitiesPage = () => {
  const { findings, isLoading: isFindingsLoading } = useAllFindings();

  const cricitalCount = getFindingCountBySeverity(findings, "critical");
  const highCount = getFindingCountBySeverity(findings, "high");
  const mediumCount = getFindingCountBySeverity(findings, "medium");
  const lowCount = getFindingCountBySeverity(findings, "low");
  const infoCount = getFindingCountBySeverity(findings, "info");

  return (
    <>
      <div className="flex">
        <StatCard title={"critical"} value={cricitalCount} />
        <StatCard title={"high"} value={highCount} />
        <StatCard title={"medium"} value={mediumCount} />
        <StatCard title={"low"} value={lowCount} />
        <StatCard title={"info"} value={infoCount} />
      </div>

      <div className="mt-4">
        <VulnerabilityTableTabs />
      </div>
      <div className="mt-4 flex">
        <div className="flex flex-1 gap-4">
          <div className="flex-1">
            <VulnerabilityTable
              columns={VulnerabilityTableColumns}
              data={findings}
              loading={isFindingsLoading}
            />
          </div>

          <VulnerabilityCard findings={findings} />
        </div>
      </div>
    </>
  );
};

export default VulnerabilitiesPage;
