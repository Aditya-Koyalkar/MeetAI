import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewAgentDialog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialog title="New Agent" description="Create a new agent" open={open} onOpenChange={onOpenChange}>
      New agent form
      <AgentForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => {
          toast.success("Agent created sucessfully");
          onOpenChange(false);
        }}
      />
    </ResponsiveDialog>
  );
};
