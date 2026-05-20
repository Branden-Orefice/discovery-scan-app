import type { ColumnDef } from "@tanstack/react-table";
import { dateToReadableString } from "#/utils/dateToReadableString.ts";
import { findingSeverities } from "#/components/internal/dashboard/findings-table/helpers/labels.ts";
import SeverityColorBadges from "#/components/internal/dashboard/SeverityColorBadges.tsx";
import type { Finding } from "#/components/internal/dashboard/findings-table/helpers/findingSchema.ts";

const DashboardFindingsColumns: ColumnDef<Finding>[] = [
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = findingSeverities.find(
        (severity) => severity.value === row.getValue("severity"),
      );

      if (!severity) {
        return null;
      }

      return (
        <div className="flex space-x-2">
          <SeverityColorBadges severity={severity.label} />
        </div>
      );
    },
  },
  {
    accessorKey: "target_url",
    header: "Target",
    cell: ({ row }) => {
      const finding = row.original;
      return (
        <div className="h-auto p-0 text-left font-semibold text-foreground/90">
          {finding.target_url}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Finding",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium text-muted-foreground sm:max-w-72 md:max-w-[31rem] line-clamp-2">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "component_type",
    header: "Type",
    cell: ({ row }) => (
      <span className="font-semibold text-foreground/90 capitalize">
        {row.getValue("component_type")}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Detected",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 items-center">
          <span className="font-semibold text-[12px] tracking-wide text-muted-foreground">
            {dateToReadableString(row.getValue("created_at"))}
          </span>
        </div>
      );
    },
  },
];

export default DashboardFindingsColumns;
