import ActiveScanCard from "#/components/internal/dashboard/ActiveScanCard";
import AssetBreakdownCard from "#/components/internal/dashboard/AssetBreakdownCard";
import GlobalVulnCard from "#/components/internal/dashboard/GlobalVulnCard";
import RiskScoreCard from "#/components/internal/dashboard/RiskScoreCard";
import StatCard from "#/components/internal/dashboard/StatCard.tsx";
import DashboardFindingsColumns from "#/components/internal/dashboard/findings-table/DashboardFindingsColumns.tsx";
import DashboardFindingsTable from "#/components/internal/dashboard/findings-table/DashboardFindingsTable.tsx";
import { useAllFindings } from "#/components/internal/dashboard/hooks/useAllFindings";
import { getFindingCountBySeverity } from "#/utils/getFindingCountBySeverity";

const DashboardHome = () => {
  const { findings, isLoading: isFindingsLoading } = useAllFindings();

  const cricitalCount = getFindingCountBySeverity(findings, "critical");
  const highCount = getFindingCountBySeverity(findings, "high");
  const mediumCount = getFindingCountBySeverity(findings, "medium");

  return (
    <>
      <div className="flex">
        <StatCard title={"critical"} value={cricitalCount} />
        <StatCard title={"high"} value={highCount} />
        <StatCard title={"medium"} value={mediumCount} />
        <StatCard title={"total assets"} value={findings.length} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Left */}
        <div className="col-span-2 h-[calc(100vh-250px)] flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <RiskScoreCard findings={findings} />
            <ActiveScanCard />
          </div>

          <DashboardFindingsTable
            columns={DashboardFindingsColumns}
            data={findings}
            loading={isFindingsLoading}
          />
        </div>

        {/* Right */}
        <div className="col-span-1 h-[calc(100vh-250px)] min-h-0 flex flex-col gap-4">
          <GlobalVulnCard />
          <AssetBreakdownCard findings={findings} />
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
