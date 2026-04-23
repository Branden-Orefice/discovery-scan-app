import StatCard from "#/components/StatCard.tsx";

const DashboardHome = () => {
  return  (
    <div className="flex">
      <StatCard title={"critical"} value={5} />
      <StatCard title={"high"} value={18} />
      <StatCard title={"medium"} value={32} />
      <StatCard title={"total assets"} value={1364} />
      <StatCard title={"exposed ports"} value={318} />
    </div>
  )
}

export default DashboardHome;