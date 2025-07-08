import { z } from "zod";

import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { meetingsInsertSchema } from "../../schemas";
import { MeetingGetOne } from "../../types";
import { useState } from "react";
import { CommandSearch } from "@/components/command-select";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({ initialValues, onCancel, onSuccess }: MeetingFormProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [agentsSearch, setAgentsSearch] = useState("");

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentsSearch,
    })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
        // WIP : If error is forbidden then redirect to payment
      },
    })
  );
  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        if (initialValues?.id) {
          await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: initialValues.id }));
        }
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
        // WIP : If error is forbidden then redirect to payment
      },
    })
  );
  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });
  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;
  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar seed={form.watch("name")} variant="botttsNeutral" className="border size-16" />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Math consultations" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="agentId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent</FormLabel>
              <FormControl>
                <CommandSearch
                  options={(agents.data?.items ?? []).map((agent) => ({
                    id: agent.id,
                    value: agent.id,
                    children: (
                      <div className="flex items-center gap-x-2">
                        <GeneratedAvatar seed={agent.name} variant="botttsNeutral" className="border size-6" />
                        <span>{agent.name}</span>
                      </div>
                    ),
                  }))}
                  onSearch={setAgentsSearch}
                  onSelect={field.onChange}
                  value={form.watch("agentId")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-x-2">
          {onCancel && (
            <Button variant={"ghost"} type="button" disabled={isPending} onClick={() => onCancel()}>
              Cancel
            </Button>
          )}

          <Button variant={"default"} type="submit" disabled={isPending}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
