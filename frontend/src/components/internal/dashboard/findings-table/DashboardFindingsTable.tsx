import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table.tsx";
import { Skeleton } from "#/components/ui/skeleton.tsx";
import type { Finding } from "#/components/internal/dashboard/findings-table/helpers/findingSchema.ts";
import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";

interface Props {
  columns: ColumnDef<Finding>[];
  data: Finding[];
  loading: boolean;
}

const DashboardFindingsTable = ({ columns, data, loading }: Props) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const visibleColumns = table.getVisibleLeafColumns();
  const skeletonRows = 8;

  return (
    <div className="overflow-hidden border border-border bg-card">
      <div className="px-4 py-2 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-semibold">Recent Findings</h3>

          <Link to="/dashboard/vulnerabilities">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer text-(--color-text-muted) tracking-wider text-[11px] font-medium uppercase"
            >
              View all {table.getFilteredRowModel().rows.length}
            </Button>
          </Link>
        </div>
      </div>

      <div className="overflow-hidden">
        <Table>
          <TableHeader className="bg-card">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-card/30">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="font-semibold tracking-wide text-(--color-text-muted) uppercase text-[12px] px-4"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                <TableRow key={`sk-${rowIndex}`}>
                  {visibleColumns.map((col) => (
                    <TableCell key={`sk-${rowIndex}-${col.id}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="transition-all duration-200 even:bg-muted/50 hover:bg-muted/80 data-[state=selected]:bg-primary/10"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="font-medium text-foreground/90 px-4 py-3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No vulnerabilities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardFindingsTable;
