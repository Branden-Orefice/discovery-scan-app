import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "#/components/ui/badge";
import { format } from "date-fns";

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

export const scanColumns: ColumnDef<Scan>[] = [
  {
    accessorKey: "scan_label",
    header: "Scan Name",
    cell: ({ row }) => {
      const label = row.getValue("scan_label") as string;
      const target = row.original.target_url;
      return (
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{label || `Scan for ${target}`}</span>
          <span className="text-xs text-muted-foreground">{target}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const progress = row.original.progress;

      const variants: Record<string, string> = {
        queued: "secondary",
        running: "primary",
        finished: "success",
        failed: "destructive",
      };

      return (
        <div className="flex flex-col gap-1">
          <Badge variant={variants[status] as any} className="w-fit capitalize">
            {status}
          </Badge>
          {status === "running" && (
            <span className="text-[10px] text-muted-foreground ml-1">
              {progress}% complete
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "scan_type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="uppercase text-[10px]">
        {row.getValue("scan_type")}
      </Badge>
    ),
  },
  {
    accessorKey: "started_at",
    header: "Started",
    cell: ({ row }) => {
      const date = row.getValue("started_at") as string;
      if (!date) return <span className="text-muted-foreground">-</span>;
      return <span className="text-sm">{format(new Date(date), "MMM d, HH:mm")}</span>;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as string;
      return <span className="text-sm">{duration || "-"}</span>;
    },
  },
];
