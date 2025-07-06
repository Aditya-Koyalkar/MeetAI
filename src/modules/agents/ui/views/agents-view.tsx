"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import DataTable from "../components/data-table";
import EmptyState from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filter";
import DataPagination from "../components/data-pagination";

export const AgentsView = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = useAgentsFilters();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({ ...filters }));
  // React Query checks the hydrated cache:
  //If that key exists:  it returns the cached data.
  //If not: it triggers a network fetch and suspends.

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable rows={data.items} />
      {data.items.length == 0 && (
        <EmptyState
          description="Create an agent to join your meetings. Each agent will follow your instructions and interact with participants during the call."
          title="Create your first agent"
        />
      )}
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page: number) => {
          setFilters({ page });
        }}
      />
    </div>
  );
};
