import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider open>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">{children}</main>
    </SidebarProvider>
  );
};

export default Layout;
