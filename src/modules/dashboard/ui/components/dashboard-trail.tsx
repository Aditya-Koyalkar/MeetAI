import Link from "next/link";
import { RocketIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from "@/modules/premium/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const DashboardTrail = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());
  if (!data) {
    return null;
  }
  return (
    <div className="border border-border/10 rounded-lg w-full bg-white/5 flex flex-col gap-y-2">
      <div className="p-3 flex flex-col gap-y-4">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4" />
          <p className="text-sm font-medium">Free Trail</p>
          <div className="flex flex-col gap-y-2">
            <p className="text-xs">
              {data.agentsCount}/{MAX_FREE_AGENTS} Agents
            </p>
            <Progress value={(data.agentsCount / MAX_FREE_AGENTS) * 100} />
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-xs">
              {data.meetingsCount}/{MAX_FREE_MEETINGS} Meetings
            </p>
            <Progress value={(data.meetingsCount / MAX_FREE_MEETINGS) * 100} />
          </div>
        </div>
      </div>
      <Button asChild className="bg-transparent border-t border-border/10 hover:bg-white/10 rounded-t-none">
        <Link href={"/upgrade"}>Upgrade</Link>
      </Button>
    </div>
  );
};
