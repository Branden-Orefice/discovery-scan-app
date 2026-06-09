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
import VulnVaultPagination from "./VulnVaultPagination";
import type { FullFindingVault } from "../helpers/fullFindingVaultSchema";

interface Props {
  columns: ColumnDef<FullFindingVault>[];
  data: FullFindingVault[];
  loading: boolean;
  isFetching?: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  totalCount: number;
}

const VulnVaultTable = ({
  columns,
  data,
  loading,
  isFetching,
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
      pagination: {
        pageIndex: page,
        pageSize,
      },
    },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: page, pageSize })
          : updater;
      setPage(next.pageIndex);
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const visibleColumns = table.getVisibleLeafColumns();
  const skeletonRows = 15;

  return (
    <div className="border border-border bg-card h-full overflow-hidden flex flex-col relative">
      {isFetching && !loading && data.length > 0 && (
        <div className="absolute inset-0 z-10 bg-card/50 backdrop-blur-[1px] flex flex-col">
          <div className="h-[40px] border-b border-border flex items-center px-4 bg-card">
            <div className="flex gap-4 w-full">
              {visibleColumns.map((col) => (
                <Skeleton key={`header-sk-${col.id}`} className="h-3 w-20" />
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="p-4 space-y-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`overlay-sk-${i}`} className="flex gap-4">
                  {visibleColumns.map((col) => (
                    <Skeleton
                      key={`overlay-sk-${i}-${col.id}`}
                      className="h-4 w-full"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="overflow-y-auto flex-1 min-h-0 [scrollbar-gutter:stable]">
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
              Array.from({ length: 20 }).map((_, rowIndex) => (
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
          loading={loading}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default VulnVaultTable;
