import StatCard from "#/components/internal/dashboard/StatCard.tsx";

const PluginsAndThemesPage = () => {
  return (
    <div className="flex">
      <StatCard title={"open ports"} value={310} />
      <StatCard title={"unique services"} value={45} />
      <StatCard title={"flagged ports"} value={23} />
      <StatCard title={"critical risk"} value={4} />
      <StatCard title={"unencrypted"} value={18} />
    </div>
  );
};

export default PluginsAndThemesPage;