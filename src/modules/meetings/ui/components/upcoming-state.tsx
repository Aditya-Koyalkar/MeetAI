import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, ClockArrowUpIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({ isCancelling, meetingId, onCancelMeeting }: Props) => {
  return (
    <div className="bg-accent rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState Icon={ClockArrowUpIcon} title="Not started yet" description="Once you start this meeting , a summary will appear here" />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button onClick={onCancelMeeting} disabled={isCancelling} variant={"secondary"} className="w-full md:w-auto">
          <BanIcon />
          Cancel Meeting
        </Button>
        <Button disabled={isCancelling} asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
