import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/app/dashboard/components/sidebar";
import { TopBar } from "@/app/dashboard/components/top-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex bg-white w-full min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <TopBar />
          <main className="p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
