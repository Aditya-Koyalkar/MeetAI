import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { LoadingState } from "@/components/loading-state";
import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { ErrorState } from "@/components/error-state";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  //This executes the TRPC query and stores the result in the server-side React Query cache.
  //The result is tagged in the cache under a unique query key (e.g., ['agents.getMany']).

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="Loading Agents" description="This may take few seconds..." />}>
        {/* Error boundary to handle component level error handling instead of page */}
        <ErrorBoundary fallback={<ErrorState title="Error fetching agents" description="Please try again later." />}>
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
