import StatCard from "#/components/internal/dashboard/StatCard.tsx";

const CoreAndConfigPage = () => {
  return (
    <div className="flex">
      <StatCard title={"All Providers"} value={89} />
      <StatCard title={"Amazon AWS"} value={54} />
      <StatCard title={"Microsoft Azure"} value={22} />
      <StatCard title={"Google Cloud"} value={11} />
    </div>
  )
};

export default CoreAndConfigPage;
