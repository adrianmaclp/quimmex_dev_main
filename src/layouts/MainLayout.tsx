import { Outlet } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";

export default function MainLayout() {
  return (
    <SidebarProvider>

      <AppSidebar />

      <SidebarInset>

        <AppHeader />

        <main className="p-6">

          <Outlet />

        </main>

      </SidebarInset>

    </SidebarProvider>
  );
}