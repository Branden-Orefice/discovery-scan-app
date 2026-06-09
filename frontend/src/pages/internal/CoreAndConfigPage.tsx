import StatCard from "#/components/internal/dashboard/StatCard.tsx";

const CoreAndConfigPage = () => {
  return (
    <div className="flex mx-auto max-w-[1600px]">
      <StatCard title={"All Providers"} loading={false} value={89} />
      <StatCard title={"Amazon AWS"} loading={false} value={54} />
      <StatCard title={"Microsoft Azure"} loading={false} value={22} />
      <StatCard title={"Google Cloud"} loading={false} value={11} />
    </div>
  );
};

export default CoreAndConfigPage;
