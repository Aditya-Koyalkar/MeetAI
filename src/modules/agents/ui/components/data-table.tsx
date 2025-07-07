"use client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AgentGetOne } from "../../types";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
type Props = {
  onRowClick?: (id: string) => void;
  rows: AgentGetOne[];
};

const DataTable = ({ rows }: Props) => {
  const router = useRouter();
  return (
    <div className="rounded-lg border bg-background overflow-hidden">
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow id={`${index}`} onClick={() => router.push(`/agents/${row.id}`)} className="cursor-pointer">
              <TableCell>
                <div className="flex flex-col gap-y-1">
                  <div className="flex items-center gap-x-2">
                    <GeneratedAvatar seed={row.name} variant="botttsNeutral" className="border size-6" />
                    <span className="font-semibold capitalize">{row.name}</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <CornerDownRightIcon className="size-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">{row.instructions}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={"outline"} className="flex items-center gap-x-2 [&>svg]:size-4">
                  <VideoIcon className="text-blue-700" />
                  {row.meetingCount} {row.meetingCount == 1 ? "meeting" : "meetings"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
