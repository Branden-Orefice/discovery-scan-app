import type { ColumnDef } from "@tanstack/react-table";
import { dateToReadableString } from "#/utils/dateToReadableString.ts";
import { findingSeverities } from "#/components/internal/dashboard/findings-table/helpers/labels.ts";
import SeverityColorBadges from "#/components/internal/dashboard/SeverityColorBadges.tsx";
import type { FullFindingVault } from "../helpers/fullFindingVaultSchema";
import { getTitleBeforeVersion } from "#/utils/getTitleBeforeVersion";

const VulnVaultTableColumns: ColumnDef<FullFindingVault>[] = [
  {
    accessorKey: "title",
    header: "Vulnerability",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="max-w-32 font-medium text-foreground/90">
            {getTitleBeforeVersion(row.original.title)}
          </span>
          <span className="text-(--color-text-muted) truncate w-[60ch]">
            {row.original.description}
          </span>
        </div>
      );
    },
  },
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
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 items-center">
          <span className="font-semibold text-[12px] tracking-wide text-muted-foreground">
            {dateToReadableString(row.getValue("published"))}
          </span>
        </div>
      );
    },
  },
];

export default VulnVaultTableColumns;
