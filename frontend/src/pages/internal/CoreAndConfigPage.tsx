import StatCard from "#/components/internal/dashboard/StatCard.tsx";
import UnderDevelopment from "#/components/internal/UnderDevelopment.tsx";

const CoreAndConfigPage = () => {
  return (
    <div className="flex flex-col gap-4 w-full mx-auto max-w-[1600px]">
      <div className="flex">
      <StatCard title={"All Providers"} loading={false} value={89} />
      <StatCard title={"Amazon AWS"} loading={false} value={54} />
      <StatCard title={"Microsoft Azure"} loading={false} value={22} />
      <StatCard title={"Google Cloud"} loading={false} value={11} />


      </div>
      <UnderDevelopment title="Core and Config coming soon" />
    </div>


  );
};

export default CoreAndConfigPage;
