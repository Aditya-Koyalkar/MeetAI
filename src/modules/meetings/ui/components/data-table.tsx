"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { MeetingGetMany } from "../../types";
import { format } from "date-fns";
import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, ClockFadingIcon, CornerDownRightIcon, LoaderIcon } from "lucide-react";
import { cn, formatDuration } from "@/lib/utils";

type Props = {
  onRowClick?: (id: MeetingGetMany[number]) => void;
  rows: MeetingGetMany;
};

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
};

const DataTable = ({ rows, onRowClick }: Props) => {
  return (
    <div className="rounded-lg border bg-background overflow-hidden">
      <Table>
        <TableBody>
          {rows.map((row, index) => {
            const Icon = statusIconMap[row.status as keyof typeof statusIconMap];
            return (
              <TableRow key={`${index}`} onClick={() => onRowClick?.(row)} className="cursor-pointer">
                <TableCell>
                  <div className="flex flex-col gap-y-1">
                    <span className="font-semibold capitalize">{row.name}</span>
                    <div className="flex items-center gap-x-2">
                      <div className="flex items-center gap-x-1">
                        <CornerDownRightIcon className="size-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">{row.agent.name}</span>
                      </div>
                      <GeneratedAvatar variant="botttsNeutral" seed={row.agent.name} />
                      <span className="text-sm text-muted-foreground">{row.startedAt ? format(row.startedAt, "MMM d") : ""}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={"outline"}
                    className={cn("capitalize [&>svg]:size-4 text-muted-foreground", statusColorMap[row.status as keyof typeof statusIconMap])}
                  >
                    <Icon className={cn(row.status === "processing" && "animate-spin")} />
                    {row.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={"outline"}
                    className={cn("capitalize [&>svg]:size-4 text-muted-foreground", statusColorMap[row.status as keyof typeof statusIconMap])}
                  >
                    <ClockFadingIcon className="text-blue-700" />
                    {row.duration ? formatDuration(row.duration) : "No duration"}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
