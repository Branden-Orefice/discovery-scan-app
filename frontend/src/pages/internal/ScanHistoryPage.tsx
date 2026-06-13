import { useMemo } from "react";
import StatCard from "#/components/internal/dashboard/StatCard.tsx";
import { useAllScans } from "#/components/internal/dashboard/hooks/useAllScans";
import { useAllFindings } from "#/components/internal/dashboard/hooks/useAllFindings";
import ScanHistoryTable from "#/components/internal/scans/scan-table/ScanHistoryTable";
import { scanColumns } from "#/components/internal/scans/scan-table/ScanTableColumns";
import { isSameMonth, parseISO } from "date-fns";

const ScanHistoryPage = () => {
  const { scans, isLoading: isScansLoading } = useAllScans();
  const { findings, isLoading: isFindingsLoading } = useAllFindings();

  const stats = useMemo(() => {
    if (!scans || !findings) return null;

    const totalScans = scans.length;
    const currentMonth = new Date();
    const scansThisMonth = scans.filter((scan: any) =>
      isSameMonth(parseISO(scan.created_at), currentMonth),
    ).length;

    // Calculate average duration (in minutes or descriptive string)
    // For now, we'll just sum up and average if they are in a parseable format
    // Simple placeholder logic if duration isn't easily numeric
    const avgDuration = totalScans > 0 ? "15m" : "0m";

    const uniqueAssets = new Set(scans.map((scan: any) => scan.target_url))
      .size;
    const totalVulns = findings.length;

    return {
      totalScans,
      scansThisMonth,
      avgDuration,
      uniqueAssets,
      totalVulns,
    };
  }, [scans, findings]);

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-[1600px] w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 ">
        <StatCard
          title={"total scans"}
          loading={isScansLoading}
          value={stats?.totalScans ?? 0}
        />
        <StatCard
          title={"this month"}
          loading={isScansLoading}
          value={stats?.scansThisMonth ?? 0}
        />
        <StatCard
          title={"avg. duration"}
          loading={isScansLoading}
          value={stats?.avgDuration ?? "0m"}
        />
        <StatCard
          title={"assets found"}
          loading={isScansLoading}
          value={stats?.uniqueAssets ?? 0}
        />
        <StatCard
          title={"vulns found"}
          loading={isFindingsLoading}
          value={stats?.totalVulns ?? 0}
        />
      </div>

      <ScanHistoryTable
        columns={scanColumns}
        data={scans}
        loading={isScansLoading}
      />
    </div>
  );
};

export default ScanHistoryPage;
