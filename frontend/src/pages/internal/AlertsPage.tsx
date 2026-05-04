import StatCard from "#/components/internal/dashboard/StatCard.tsx";

const AlertsPage = () => {
  return (
    <div className="flex">
      <StatCard title={"unread"} value={89} />
      <StatCard title={"critical"} value={54} />
      <StatCard title={"total today"} value={22} />
      <StatCard title={"resolved"} value={11} />
      <StatCard title={"avg. response"} value={2.5} />
    </div>
  )
};

export default AlertsPage;