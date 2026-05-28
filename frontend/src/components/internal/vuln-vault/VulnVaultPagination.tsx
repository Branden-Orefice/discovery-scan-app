import { Button } from "#/components/ui/button";
import { SkipBack, SkipForward, StepBack, StepForward } from "lucide-react";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  totalCount: number;
}

const VulnVaultPagination = ({
  page,
  setPage,
  pageSize,
  totalCount,
}: Props) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex items-center justify-between overflow-hidden">
      <div className="text-muted-foreground hidden flex-1 text-sm sm:block">
        {totalCount} total vulns.
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">
          Page {page + 1} of {totalPages}
        </span>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(0)}
          disabled={page === 0}
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          <StepBack className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage((p) => p + 1)}
          disabled={page + 1 >= totalPages}
        >
          <StepForward className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(totalPages - 1)}
          disabled={page + 1 >= totalPages}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VulnVaultPagination;
