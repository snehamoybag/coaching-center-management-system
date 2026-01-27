import type { ReactElement } from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  Sidebar,
  SidebarTrigger,
} from "./ui/sidebar";
import SidebarMainMenu from "./SidebarMainMenu";
import type { UserType } from "@/types/UserType";
import { Link } from "react-router";

interface AppSidebarProps {
  user: UserType;
  className?: string;
}

export default function AppSidebar({
  user,
  className = "",
}: Readonly<AppSidebarProps>): ReactElement {
  return (
    <Sidebar className={className}>
      <SidebarHeader>
        <div className="flex items-start justify-between gap-4">
          <h2>Bag Coaching Center</h2>
          {/* sidbar toggle button (only for mobile users) */}
          <SidebarTrigger className="md:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMainMenu />
      </SidebarContent>

      <SidebarFooter>
        <Link to={`/profile/${user.id}`} className="capitalize">
          {user.firstName} {user.lastName}
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
