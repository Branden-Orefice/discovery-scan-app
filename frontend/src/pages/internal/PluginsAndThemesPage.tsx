import StatCard from "#/components/internal/dashboard/StatCard.tsx";
import UnderDevelopment from "#/components/internal/UnderDevelopment.tsx";

const PluginsAndThemesPage = () => {
  return (
    <div className="flex flex-col w-full gap-4 mx-auto max-w-[1600px]">
      <div className="flex">
      <StatCard title={"open ports"} loading={false} value={310} />
      <StatCard title={"unique services"} loading={false} value={45} />
      <StatCard title={"flagged ports"} loading={false} value={23} />
      <StatCard title={"critical risk"} loading={false} value={4} />
      <StatCard title={"unencrypted"} loading={false} value={18} />
    </div>

      <UnderDevelopment title="Plugins and Themes coming soon" />
    </div>
  );
};

export default PluginsAndThemesPage;
