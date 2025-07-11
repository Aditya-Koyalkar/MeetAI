import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
};

export const UpdateMeetingDialog = ({ open, onOpenChange, initialValues }: Props) => {
  return (
    <ResponsiveDialog title="Edit Meeting" description="Edit the meeting details" open={open} onOpenChange={onOpenChange}>
      Update Meeting form
      <MeetingForm
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
