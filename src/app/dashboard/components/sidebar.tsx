"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-14 justify-center flex items-center px-4">
        <Link href="/dashboard" className="font-semibold">
          Modern Dashboard
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="!bg-white">
          <SidebarMenuItem className="bg-white">
            <SidebarMenuButton asChild isActive className="py-5 my-2">
              <Link href="/dashboard/users" className="bg-white">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
