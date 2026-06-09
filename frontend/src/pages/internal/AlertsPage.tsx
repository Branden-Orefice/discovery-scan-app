import StatCard from "#/components/internal/dashboard/StatCard.tsx";

const AlertsPage = () => {
  return (
    <div className="flex mx-auto max-w-[1600px]">
      <StatCard title={"unread"} loading={false} value={89} />
      <StatCard title={"critical"} loading={false} value={54} />
      <StatCard title={"total today"} loading={false} value={22} />
      <StatCard title={"resolved"} loading={false} value={11} />
      <StatCard title={"avg. response"} loading={false} value={2.5} />
    </div>
  );
};

export default AlertsPage;
