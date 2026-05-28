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
import type { FullFinding } from "../helpers/fullFindingSchema";
import VulnVaultPagination from "./VulnVaultPagination";

interface Props {
  columns: ColumnDef<FullFinding>[];
  data: FullFinding[];
  loading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  totalCount: number;
}

const VulnVaultTable = ({
  columns,
  data,
  loading,
  page,
  setPage,
  pageSize,
  totalCount,
}: Props) => {
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
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const visibleColumns = table.getVisibleLeafColumns();
  const skeletonRows = 8;

  return (
    <div className="border border-border bg-card h-full overflow-hidden flex flex-col">
      <div className="overflow-y-auto flex-1 min-h-0">
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
                  className="transition-all duration-200 hover:bg-muted/80 data-[state=selected]:bg-primary/5 cursor-pointer"
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
                  No vault vulnerabilities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="px-4 py-4">
        <VulnVaultPagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default VulnVaultTable;
