import { HardHat } from "lucide-react";
import { Card, CardContent } from "#/components/ui/card";
import { cn } from "@/lib/utils";

interface UnderDevelopmentProps {
  className?: string;
  title?: string;
  description?: string;
}

const UnderDevelopment = ({
  className,
  title = "Under Development",
  description = "This feature is currently under construction and will be available soon.",
}: UnderDevelopmentProps) => {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center border-dashed p-12 text-center",
        className
      )}
    >
      <CardContent className="flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <HardHat className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="max-w-[350px] text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnderDevelopment;
