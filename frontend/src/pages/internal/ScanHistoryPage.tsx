import StatCard from "#/components/internal/dashboard/StatCard.tsx";

const ScanHistoryPage = () => {
  return (
    <div className="flex mx-auto max-w-[1600px]">
      <StatCard title={"total scans"} loading={false} value={48} />
      <StatCard title={"this month"} loading={false} value={5} />
      <StatCard title={"avg. duration"} loading={false} value={1} />
      <StatCard title={"assets found"} loading={false} value={1257} />
      <StatCard title={"vulns found"} loading={false} value={243} />
    </div>
  );
};

export default ScanHistoryPage;
