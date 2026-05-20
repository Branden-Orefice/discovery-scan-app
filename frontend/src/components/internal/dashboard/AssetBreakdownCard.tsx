import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Progress } from "#/components/ui/progress";
import type { Finding } from "./findings-table/helpers/findingSchema";

const AssetBreakdownCard = ({ findings }: { findings: Finding[] }) => {
  const totalFindings = findings.length;

  const coreCount = findings.filter(
    (vuln) => vuln.component_type === "core",
  ).length;

  const themeCount = findings.filter(
    (vuln) => vuln.component_type === "theme",
  ).length;

  const pluginCount = findings.filter(
    (vuln) => vuln.component_type === "plugin",
  ).length;

  const configCount = findings.filter(
    (vuln) => vuln.component_type === "config",
  ).length;

  const rows = [
    {
      label: "Core",
      count: coreCount,
      value: (coreCount / totalFindings) * 100,
    },
    {
      label: "Theme",
      count: themeCount,
      value: (themeCount / totalFindings) * 100,
    },
    {
      label: "Plugin",
      count: pluginCount,
      value: (pluginCount / totalFindings) * 100,
    },
    {
      label: "Config",
      count: configCount,
      value: (configCount / totalFindings) * 100,
    },
    { label: "Vulns", count: totalFindings, value: totalFindings },
  ];

  return (
    <Card className="relative border-border bg-card shadow-sm h-[200px] overflow-hidden">
      <CardHeader className="shrink-0 border-b border-border uppercase text-(--color-text-muted)">
        Asset Breakdown
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {rows.map(({ label, count, value }) => (
            <div key={label} className="flex items-center gap-3 text-[12px]">
              <span className="w-10 text-(--color-text-muted)">{label}</span>
              <Progress className="flex-1" value={value} />
              <span className="w-4 text-right font-bold text-foreground/90">
                {count}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetBreakdownCard;
