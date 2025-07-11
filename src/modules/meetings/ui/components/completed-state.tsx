import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MarkDown from "react-markdown";
import { MeetingGetOne } from "../../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenTextIcon, ClockFadingIcon, FileTextIcon, FileVideoIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import { Transcript } from "./transcript";
import { ChatProvider } from "./chat-provider";

interface Props {
  data: MeetingGetOne;
}
export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="bg-white rounded-lg border px-3">
          <ScrollArea>
            <TabsList className="p-0 bg-background justify-start rounded-none h-13">
              <TabsTrigger
                value="summary"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <SparklesIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <TabsContent value="recording">
          <div className="bg-white rounded-lg border px-4 py-5">
            <video src={data.recordingUrl!} className="w-full rounded-lg" controls />
          </div>
        </TabsContent>
        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>
        <TabsContent value="chat">
          <ChatProvider meetingId={data.id} meetingName={data.name} />
        </TabsContent>

        <TabsContent value="summary">
          <div className="bg-white rounded-lg border">
            <div className="px-4 py-5 flex flex-col col-span-5 gap-3">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
              <div className="flex gap-x-2 items-center">
                <Link href={`/agents/${data.agent.id}`} className="flex items-center gap-x-2 underline underline-offset-4 capitalize">
                  <GeneratedAvatar variant="botttsNeutral" seed={data.agent.name} className="size-5" />
                </Link>
                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4" />
                <p>Generated summary</p>
              </div>
              <Badge variant={"outline"} className="flex items-center gap-x-2 [&>svg]:size-4">
                <ClockFadingIcon className="text-blue-700" />
                {data.duration ? formatDuration(data.duration) : "No duration"}
              </Badge>
              <div>
                <MarkDown
                  components={{
                    h1: (props) => <h1 className="text-3xl font-bold my-4" {...props} />,
                    h2: (props) => <h2 className="text-2xl font-semibold my-3" {...props} />,
                    h3: (props) => <h3 className="text-xl font-medium my-2" {...props} />,
                    h4: (props) => <h4 className="text-lg font-medium my-2" {...props} />,
                    h5: (props) => <h5 className="text-base font-medium my-2" {...props} />,
                    h6: (props) => <h6 className="text-sm font-medium my-2" {...props} />,
                    p: (props) => <p className="text-base leading-relaxed my-2 text-muted-foreground" {...props} />,
                    a: (props) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                    ul: (props) => <ul className="list-disc list-inside my-2 ml-4" {...props} />,
                    ol: (props) => <ol className="list-decimal list-inside my-2 ml-4" {...props} />,
                    li: (props) => <li className="my-1" {...props} />,
                    blockquote: (props) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />,
                    code: (props) => <code className="bg-gray-100 text-sm font-mono px-1 py-0.5 rounded" {...props} />,
                    pre: (props) => <pre className="bg-black text-white p-4 overflow-x-auto rounded my-4" {...props} />,
                    strong: (props) => <strong className="font-semibold" {...props} />,
                    em: (props) => <em className="italic" {...props} />,
                    hr: () => <hr className="my-4 border-gray-300" />,
                  }}
                >
                  {data.summary}
                </MarkDown>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
