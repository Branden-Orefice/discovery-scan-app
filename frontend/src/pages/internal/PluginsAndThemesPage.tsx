import StatCard from "#/components/internal/dashboard/StatCard.tsx";

const PluginsAndThemesPage = () => {
  return (
    <div className="flex mx-auto max-w-[1600px]">
      <StatCard title={"open ports"} loading={false} value={310} />
      <StatCard title={"unique services"} loading={false} value={45} />
      <StatCard title={"flagged ports"} loading={false} value={23} />
      <StatCard title={"critical risk"} loading={false} value={4} />
      <StatCard title={"unencrypted"} loading={false} value={18} />
    </div>
  );
};

export default PluginsAndThemesPage;
