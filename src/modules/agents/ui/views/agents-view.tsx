"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import DataTable from "../components/data-table";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  // React Query checks the hydrated cache:
  //If that key exists:  it returns the cached data.
  //If not: it triggers a network fetch and suspends.

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable rows={data} />
    </div>
  );
};
