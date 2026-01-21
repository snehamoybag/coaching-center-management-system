import type { ReactElement } from "react";
import { Outlet } from "react-router";
import AppSidebar from "./components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

export default function Root(): ReactElement {
  return (
    // sidebar and main container
    <SidebarProvider>
      {/* sidebar */}
      <AppSidebar />

      <main className="p-4">
        {/* sidebar toggle button */}
        <SidebarTrigger title="Toggle sidebar" />

        {/* content */}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
