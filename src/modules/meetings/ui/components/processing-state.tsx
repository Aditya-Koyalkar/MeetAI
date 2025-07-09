import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

export const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState image="/processing.svg" title="Meeting completed" description="This meeting was completed,a summary will appear soon" />
    </div>
  );
};
