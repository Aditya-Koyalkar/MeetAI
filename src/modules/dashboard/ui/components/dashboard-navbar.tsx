"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export const DashboardNavbar = () => {
  const { isMobile, state, toggleSidebar } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);
  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex items-center justify-between bg-background w-full">
        <div className="flex px-4 gap-x-2 items-center py-3">
          <Button className="size-9 border-foreground/50" variant={"outline"} onClick={toggleSidebar}>
            {state == "collapsed" || isMobile ? <PanelLeftIcon className="size-4" /> : <PanelLeftCloseIcon className="size-4" />}
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground hover:bg-background cursor-pointer"
            onClick={() => setCommandOpen((open) => !open)}
          >
            <SearchIcon />
            Search
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </Button>
        </div>
        <div className="mx-2">
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};
