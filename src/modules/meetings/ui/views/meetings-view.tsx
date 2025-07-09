"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import DataTable from "../components/data-table";
import EmptyState from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import DataPagination from "@/components/data-pagination";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({ ...filters }));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        rows={data.items}
        onRowClick={(row) => {
          router.push(`/meetings/${row.id}`);
        }}
      />
      <DataPagination onPageChange={(page) => setFilters({ page })} page={filters.page} totalPages={data.totalPages} />
      {data.items.length == 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  );
};
