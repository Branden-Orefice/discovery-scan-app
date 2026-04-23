import StatCard from "#/components/StatCard.tsx";

const ScanHistoryPage = () => {
  return (
    <div className="flex">
      <StatCard title={"total scans"} value={48} />
      <StatCard title={"this month"} value={5} />
      <StatCard title={"avg. duration"} value={1} />
      <StatCard title={"assets found"} value={1257} />
      <StatCard title={"vulns found"} value={243} />
    </div>
  )
};

export default ScanHistoryPage;