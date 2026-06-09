import { SkipBack, SkipForward, StepBack, StepForward } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Skeleton } from "#/components/ui/skeleton";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  isFetching?: boolean;
}

const VulnVaultPagination = ({
  page,
  setPage,
  pageSize,
  totalCount,
  loading,
  isFetching,
}: Props) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-muted-foreground hidden flex-1 text-sm sm:block min-w-[150px]">
        {loading ? (
          <Skeleton className="h-4 w-24" />
        ) : (
          <div className="tabular-nums">
            {totalCount.toLocaleString()} total vulns.
          </div>
        )}
      </div>
      <div className="flex items-center sm:space-x-6 lg:space-x-8 shrink-0">
        <div className="flex w-[160px] shrink-0 items-center justify-center text-sm font-medium tabular-nums">
          {loading ? (
            <Skeleton className="h-4 w-[120px]" />
          ) : (
            <>
              Page {page + 1} of {totalPages.toLocaleString()}
            </>
          )}
        </div>
        <div className="flex items-center shrink-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPage(0)}
            disabled={page === 0 || loading || isFetching}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0 || loading || isFetching}
          >
            <StepBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1 || loading || isFetching}
          >
            <StepForward className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPage(totalPages - 1)}
            disabled={page >= totalPages - 1 || loading || isFetching}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VulnVaultPagination;
