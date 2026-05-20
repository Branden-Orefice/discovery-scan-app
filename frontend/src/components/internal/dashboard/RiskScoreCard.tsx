import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "#/components/ui/card";
import { ChartContainer, type ChartConfig } from "#/components/ui/chart";
import {
  severitySchema,
  type Finding,
  type Severity,
} from "./findings-table/helpers/findingSchema";
import { Progress } from "#/components/ui/progress";

const severityWeights: Record<Severity, number> = {
  critical: 10,
  high: 7,
  medium: 4,
  low: 2,
  info: 0.5,
};

const getRiskLabel = (score: number) => {
  if (score >= 76) return "Critical Risk";
  if (score >= 51) return "High Risk";
  if (score >= 21) return "Moderate Risk";
  return "Low Risk";
};

const calculateRiskScore = (findings: Finding[]) => {
  if (!findings.length) return 0;

  const maxPossibleScore = findings.length * severityWeights.critical;

  const actualScore = findings.reduce((total, finding) => {
    const severity = severitySchema.parse(finding.severity);

    return total + severityWeights[severity];
  }, 0);

  return Math.round((actualScore / maxPossibleScore) * 100);
};

const chartConfig = {
  risk: {
    label: "Risk",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const RiskScoreCard = ({ findings }: { findings: Finding[] }) => {
  const severityData = [
    {
      id: 1,
      severity: "critical",
      total: findings.filter((finding) => finding.severity === "critical")
        .length,
    },
    {
      id: 2,
      severity: "high",
      total: findings.filter((finding) => finding.severity === "high").length,
    },
    {
      id: 3,
      severity: "medium",
      total: findings.filter((finding) => finding.severity === "medium").length,
    },
    {
      id: 4,
      severity: "low",
      total: findings.filter((finding) => finding.severity === "low").length,
    },
    {
      id: 5,
      severity: "info",
      total: findings.filter((finding) => finding.severity === "info").length,
    },
  ];
  const riskScore = calculateRiskScore(findings);
  const riskLabel = getRiskLabel(riskScore);

  const chartData = [
    {
      name: "risk",
      risk: riskScore,
      fill: "var(--chart-2)",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <CardHeader className="uppercase text-(--color-text-muted) text-center">
          Overall Risk Score
        </CardHeader>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            outerRadius={100}
            innerRadius={85}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[100, 85]}
            />

            <RadialBar dataKey="risk" background cornerRadius={10} max={100} />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 10}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {riskScore}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-muted-foreground text-sm"
                        >
                          / 100
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 36}
                          className="fill-muted-foreground text-[11px] uppercase"
                        >
                          {riskLabel}
                        </tspan>
                      </text>
                    );
                  }

                  return null;
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col gap-2 w-full">
          {severityData.map((data) => (
            <div key={data.id} className="flex items-center gap-3">
              <span className="w-16 text-sm capitalize text-(--color-text-muted)">
                {data.severity}
              </span>
              <Progress
                className="flex-1"
                value={data.total}
                max={findings.length}
              />
              <span className="w-4 text-sm text-right">{data.total}</span>
            </div>
          ))}
          <div className="text-sm text-muted-foreground/90 text-center mt-1">
            Based on{" "}
            <span className="text-(--brand-secondary) font-semibold">
              {" "}
              {findings.length}
            </span>{" "}
            total findings
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RiskScoreCard;
