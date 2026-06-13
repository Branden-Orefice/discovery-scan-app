import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Globe } from "#/components/ui/globe";
import { dateToReadableString } from "@/utils/dateToReadableString";
import { useWordfenceVulns } from "./hooks/useWordfenceVulns";
import SeverityColorBadges from "./SeverityColorBadges";
import { Link } from "@tanstack/react-router";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "#/components/ui/empty";

const GlobalVulnCard = () => {
  const { isLoading, wordfenceVulns } = useWordfenceVulns();

  const vulns = wordfenceVulns?.data ?? [];

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const count7Days = vulns.filter((vuln: any) => {
    const pubDate = new Date(vuln.published);
    return pubDate >= sevenDaysAgo;
  }).length;

  const count30Days = vulns.filter((vuln: any) => {
    const pubDate = new Date(vuln.published);
    return pubDate >= thirtyDaysAgo;
  }).length;

  const metrics = [
    { label: "7 Days", value: count7Days },
    { label: "30 Days", value: count30Days },
  ];

  return (
    <Card className="border-border bg-card shadow-sm flex-1 min-h-0 flex flex-col">
      <CardHeader className="text-center uppercase text-(--color-text-muted)">
        <h2>Newest Vulnerabilities Detected</h2>
      </CardHeader>
      <CardContent className="p-4 flex-1 min-h-0 flex flex-col">
        <div className="mb-4 grid grid-cols-2 gap-2 shrink-0">
          {metrics.map((vulnTotal) => (
            <div
              key={vulnTotal.label}
              className="border border-border px-3 py-2.5"
            >
              <div className="text-[10px] font-semibold uppercase text-(--color-text-muted) mb-1">
                {vulnTotal.label}
              </div>
              <div className="text-xl font-bold tracking-tight">
                {isLoading ? "..." : vulnTotal.value}
              </div>
            </div>
          ))}
        </div>

        <div className="relative xl:h-[250px] md:h-[150px] shrink-0 overflow-hidden border border-border mb-4">
          <div className="absolute inset-0">
            <Globe />
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          {vulns.length ? (
            <div className="space-y-2">
              {vulns.slice(0, 20).map((vuln: any) => (
                <div
                  key={vuln.id}
                  className="rounded-lg border border-border bg-card px-3 py-3 hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <SeverityColorBadges severity={vuln.severity} />

                    <span className="text-[11px] text-(--color-text-muted) shrink-0">
                      {dateToReadableString(vuln.published)}
                    </span>
                  </div>

                  <p className="text-xs font-medium leading-5 text-foreground/90 line-clamp-2 mb-3">
                    {vuln.title}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <span className="max-w-[65%] truncate text-[11px] font-mono text-(--color-text-muted)">
                      {vuln.cve ?? "No CVE"}
                    </span>

                    <span className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-(--color-text-muted)">
                      CVSS {vuln.cvssScore ?? "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-30 flex items-center justify-center">
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>No Current Vulnerabilities</EmptyTitle>
                  <EmptyDescription className="max-w-xs text-pretty">
                    Once you kick off your first scan, we will update this
                    automatically with new vulnerabilities across all WordPress
                    component types in realtime.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          )}
        </div>
        <div className="mt-4">
          <Link to="/dashboard/vuln-vault" className="mt-auto">
            <Button
              variant="outline"
              className="cursor-pointer w-full"
              disabled={isLoading}
            >
              See All
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalVulnCard;
