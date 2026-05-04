import StatCard from "#/components/internal/dashboard/StatCard.tsx";
import columns from "#/components/internal/dashboard/findings-table/DashboardFindingsColumns.tsx";
import DashboardFindingsTable from "#/components/internal/dashboard/findings-table/DashboardFindingsTable.tsx";

const DashboardHome = () => {
  return  (
    <>
    <div className="flex">
      <StatCard title={"critical"} value={5} />
      <StatCard title={"high"} value={18} />
      <StatCard title={"medium"} value={32} />
      <StatCard title={"total assets"} value={1364} />
      <StatCard title={"exposed ports"} value={318} />
    </div>

    {/*<DashboardFindingsTable columns={columns} data={findings} loading={isLoading} />*/}
    </>
  )
}

export default DashboardHome;