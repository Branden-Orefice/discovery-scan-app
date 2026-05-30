import { Skeleton } from "#/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: number;
  loading: boolean;
}

const StatCard = ({ title, value, loading }: StatCardProps) => {
  return (
    <div className="border border-border px-4 py-8 bg-card hover:border-b-accent-primary transition-colors duration-100 w-full">
      <h2 className="text-[10px] uppercase text-(--color-text-muted)">
        {title}
      </h2>

      {loading ? (
        <Skeleton className="mt-2 h-9 w-24" />
      ) : (
        <span className="text-3xl font-bold">{value.toLocaleString()}</span>
      )}
    </div>
  );
};

export default StatCard;
