import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { toast } from "sonner";
import { AgentGetOne } from "../../types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialsValues: AgentGetOne;
};

export const UpdateAgentDialog = ({ open, onOpenChange, initialsValues }: Props) => {
  return (
    <ResponsiveDialog title="New Agent" description="Create a new agent" open={open} onOpenChange={onOpenChange}>
      Update agent form
      <AgentForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => {
          toast.success("Agent updated sucessfully");
          onOpenChange(false);
        }}
        initialValues={initialsValues}
      />
    </ResponsiveDialog>
  );
};
