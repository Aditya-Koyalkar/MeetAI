import { ResponsiveDialog } from "@/components/responsive-dialog";
import { toast } from "sonner";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewMeetingDialog = ({ open, onOpenChange }: Props) => {
  const router = useRouter();
  return (
    <ResponsiveDialog title="New Meeting" description="Create a new meeting" open={open} onOpenChange={onOpenChange}>
      New Meeting form
      <MeetingForm
        onSuccess={(id?: string) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
      />
    </ResponsiveDialog>
  );
};
