import type { ReactElement } from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { Link, useLocation } from "react-router";
import {
  Home,
  Users,
  User,
  CirclePile,
  CirclePercent,
  BanknoteArrowDown,
} from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
  },
  {
    title: "Teachers",
    url: "/teachers",
    icon: User,
  },
  {
    title: "Batches",
    url: "/batches",
    icon: CirclePile,
  },
  {
    title: "Fees",
    url: "/fees",
    icon: CirclePercent,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: BanknoteArrowDown,
  },
];

interface SidebarMenuProps {
  className?: string;
}

export default function SidebarMainMenu({
  className = "",
}: Readonly<SidebarMenuProps>): ReactElement {
  const location = useLocation();
  const activePath = location.pathname.toLowerCase();

  const menuItems = items.map((item) => {
    let isActive = false;

    if (activePath === item.title.toLowerCase()) {
      isActive = true;
    } else if (activePath === "/" && item.title.toLowerCase() === "home") {
      isActive = true;
    } else {
      isActive = false;
    }

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild isActive={isActive}>
          <Link to={item.url}>
            <item.icon /> <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });
  return (
    <SidebarGroup className={className}>
      <SidebarGroupLabel className="sr-only">Menu</SidebarGroupLabel>
      <SidebarMenu>{menuItems}</SidebarMenu>
    </SidebarGroup>
  );
}
