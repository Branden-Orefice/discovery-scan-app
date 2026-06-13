import {cn} from "#/lib/utils.ts";
import {displayFallback} from "#/utils/displayFallback.ts";

const OverviewItem = ({
                        label,
                        value,
                        className,
                      }: {
  label: string;
  value: unknown;
  className?: string;
}) => (
  <div>
    <p className="text-[10px] uppercase text-(--color-text-muted)">{label}</p>
    <p className={cn("mt-1 text-[12px] font-medium text-foreground", className)}>
      {displayFallback(value)}
    </p>
  </div>
);

export default OverviewItem;