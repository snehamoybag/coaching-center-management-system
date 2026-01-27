import { type ReactElement } from "react";
import { Outlet, useLoaderData } from "react-router";
import AppSidebar from "./components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import type { UserType } from "./types/UserType";
import type { OutletContextType } from "./types/OutletContextType";

export default function ProtectedLayout(): ReactElement {
  const user = useLoaderData<UserType>();

  return (
    // sidebar and main container
    <SidebarProvider>
      {/* sidebar */}
      <aside>
        <AppSidebar user={user} />
      </aside>

      <main className="w-full p-4 space-y-4">
        {/* sidebar toggle button */}
        <SidebarTrigger title="Toggle sidebar" />

        {/* content */}
        <Outlet context={{ user } satisfies OutletContextType} />
      </main>
    </SidebarProvider>
  );
}
