import { ResponsiveDialog } from "@/components/responsive-dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewAgentDialog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialog title="New Agent" description="Create a new agent" open={open} onOpenChange={onOpenChange}>
      New agent form
    </ResponsiveDialog>
  );
};
