import EmptyState from "@/components/empty-state";
import { CircleXIcon } from "lucide-react";

export const CancelledState = () => {
  return (
    <div className="bg-accent rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState Icon={CircleXIcon} title="Meeting cancelled" description="This meeting was cancelled" />
    </div>
  );
};
