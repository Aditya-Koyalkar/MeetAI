import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CommandSelect } from "@/components/command-select";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import { GeneratedAvatar } from "@/components/generated-avatar";

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const trpc = useTRPC();
  const [agentsSearch, setAgentsSearch] = useState("");
  const { data } = useQuery(trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentsSearch }));
  return (
    <CommandSelect
      onSelect={(value) => setFilters({ agentId: value })}
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar seed={agent.name} variant="botttsNeutral" className="size-4" />
            {agent.name}
          </div>
        ),
      }))}
      value={filters.agentId}
      onSearch={setAgentsSearch}
      placeholder="Select an Agent"
    />
  );
};
