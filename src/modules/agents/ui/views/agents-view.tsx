"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  // React Query checks the hydrated cache:
  //If that key exists:  it returns the cached data.
  //If not: it triggers a network fetch and suspends.

  return <div>{JSON.stringify(data, null, 2)}</div>;
};
