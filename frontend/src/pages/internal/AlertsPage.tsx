import StatCard from "#/components/internal/dashboard/StatCard.tsx";
import UnderDevelopment from "#/components/internal/UnderDevelopment.tsx";

const AlertsPage = () => {
  return (
    <div className="flex flex-col gap-4 mx-auto max-w-[1600px] w-full">
      <div className="flex">
      <StatCard title={"unread"} loading={false} value={89} />
      <StatCard title={"critical"} loading={false} value={54} />
      <StatCard title={"total today"} loading={false} value={22} />
      <StatCard title={"resolved"} loading={false} value={11} />
      <StatCard title={"avg. response"} loading={false} value={2.5} />
    </div>

      <UnderDevelopment title={"Alerts coming soon"} />
    </div>
  );
};

export default AlertsPage;
