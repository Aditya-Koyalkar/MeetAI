import EmptyState from "@/components/empty-state";
import { LoaderIcon } from "lucide-react";

export const ProcessingState = () => {
  return (
    <div className="bg-accent rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState Icon={LoaderIcon} title="Meeting completed" description="This meeting was completed,a summary will appear soon" />
    </div>
  );
};
