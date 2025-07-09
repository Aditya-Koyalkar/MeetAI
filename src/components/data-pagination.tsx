import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const DataPagination = ({ onPageChange, page, totalPages }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page === 1}
          onClick={() => {
            onPageChange(Math.max(page - 1, 1));
          }}
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0}
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            onPageChange(Math.min(totalPages, page + 1));
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataPagination;
