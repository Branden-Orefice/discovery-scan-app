import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { useAllScans } from "#/components/internal/dashboard/hooks/useAllScans.ts";
import { Badge } from "#/components/ui/badge";
import { Progress } from "#/components/ui/progress";
import { Loader2, Clock, Play, History, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "@tanstack/react-router";

export interface Scan {
  id: string;
  user_id: string;
  scan_type: string;
  target_url: string;
  status: "queued" | "running" | "finished" | "failed";
  progress: number;
  started_at: string | null;
  finished_at: string | null;
  duration: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
  scan_label: string | null;
  scan_schedule: string | null;
  scan_modules: any | null;
  scan_alerts: string | null;
  scan_scheduled_at: string | null;
  scan_scheduled_frequency: string | null;
}

const ActiveScanCard = () => {
  const { scans, isLoading } = useAllScans();

  const sortedScans = [...(scans as Scan[])].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const activeScans = sortedScans.filter(
    (s) => s.status === "running" || s.status === "queued",
  );
  const recentFinishedScans = sortedScans
    .filter((s) => s.status === "finished" || s.status === "failed")
    .slice(0, 5);

  const displayScans =
    activeScans.length > 0 ? activeScans : recentFinishedScans;

  const getStatusBadge = (status: Scan["status"]) => {
    switch (status) {
      case "running":
        return (
          <Badge
            variant="outline"
            className="border-chart-4/50 bg-chart-4/10 text-chart-4/50"
          >
            Running
          </Badge>
        );
      case "queued":
        return (
          <Badge
            variant="outline"
            className="border-chart-5/50 bg-chart-5/10 text-chart-5/50"
          >
            Queued
          </Badge>
        );
      case "finished":
        return (
          <Badge
            variant="outline"
            className="border-(--brand-secondary)/50 bg-(--brand-secondary)/10 text-(--brand-secondary)/50"
          >
            Finished
          </Badge>
        );
      case "failed":
        return (
          <Badge
            variant="outline"
            className="border-destructve/50 bg-destructive/10 text-destructive/50"
          >
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm uppercase text-(--color-text-muted)">
          {activeScans.length > 0 ? "Active Scans" : "Recent Scans"}
        </CardTitle>
        {activeScans.length > 0 ? (
          <Play className="h-4 w-4 text-chart-4" />
        ) : (
          <History className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-auto py-2">
        {isLoading ? (
          <div className="flex h-full items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : displayScans.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground">No scans found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayScans.map((scan) => (
              <Link
                key={scan.id}
                to="/dashboard/scan-history"
                className="group relative flex flex-col space-y-2 rounded-lg border border-border/50 bg-muted/30 p-3 transition-all hover:bg-muted/50 hover:border-chart-4/30"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <span className="truncate text-sm font-semibold">
                      {scan.scan_label || scan.target_url}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {scan.scan_type} • {scan.target_url}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {getStatusBadge(scan.status)}
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>

                {(scan.status === "running" || scan.status === "queued") && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] uppercase text-muted-foreground">
                      <span>Progress</span>
                      <span>{scan.progress}%</span>
                    </div>
                    <Progress value={scan.progress} className="h-1.5" />
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {scan.status === "finished" || scan.status === "failed"
                        ? scan.finished_at
                          ? formatDistanceToNow(new Date(scan.finished_at), {
                              addSuffix: true,
                            })
                          : "Unknown"
                        : scan.started_at
                          ? formatDistanceToNow(new Date(scan.started_at), {
                              addSuffix: true,
                            })
                          : "Pending"}
                    </span>
                  </div>
                  {scan.duration && (
                    <span className="font-medium">{scan.duration}</span>
                  )}
                </div>

                {scan.status === "failed" && scan.error_message && (
                  <p className="mt-1 line-clamp-1 text-[10px] text-destructive">
                    {scan.error_message}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-border bg-muted/20 py-3">
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <span>Total Scans: {scans.length}</span>
          {activeScans.length > 0 && (
            <span className="flex items-center gap-1 text-chart-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chart-4 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-chart-4"></span>
              </span>
              {activeScans.length} Active
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ActiveScanCard;
