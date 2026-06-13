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

  const criticalCount = getFindingCountBySeverity(findings, "critical");
  const highCount = getFindingCountBySeverity(findings, "high");
  const mediumCount = getFindingCountBySeverity(findings, "medium");

  return (
    <div className="mx-auto min-h-[calc(100vh-120px)] max-w-[1600px]">
      <div className="grid grid-cols-4">
        <StatCard
          title="critical"
          loading={isFindingsLoading}
          value={criticalCount}
        />
        <StatCard title="high" loading={isFindingsLoading} value={highCount} />
        <StatCard
          title="medium"
          loading={isFindingsLoading}
          value={mediumCount}
        />
        <StatCard
          title="total assets"
          loading={isFindingsLoading}
          value={findings.length}
        />
      </div>

      <div className="mt-4 grid h-[calc(100vh-220px)] grid-cols-3 gap-4">
        <div className="col-span-2 flex min-h-0 flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <RiskScoreCard findings={findings} />
            <ActiveScanCard />
          </div>

          <div className="min-h-0 flex-1">
            <DashboardFindingsTable
              columns={DashboardFindingsColumns}
              data={findings}
              loading={isFindingsLoading}
            />
          </div>
        </div>

        <div className="col-span-1 flex min-h-0 flex-col gap-4">
          <GlobalVulnCard />
          <AssetBreakdownCard findings={findings} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
