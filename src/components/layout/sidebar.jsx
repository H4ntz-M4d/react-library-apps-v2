import {
  LayoutDashboard,
  Boxes,
  LibraryBig,
  BookUp,
  BookDown,
  HandCoins,
  ChevronRight,
  Users,
  ShieldUser,
  UserCheck,
  IdCard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Link } from "react-router";

// Menu items.
const items = [
  {
    title: "Genre",
    url: "/genre",
    icon: Boxes,
  },
  {
    title: "List Buku",
    url: "/books",
    icon: LibraryBig,
  },
  {
    title: "Peminjaman",
    url: "#",
    icon: BookUp,
  },
  {
    title: "Pengembalian",
    url: "#",
    icon: BookDown,
  },
  {
    title: "Biaya",
    url: "#",
    icon: HandCoins,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="#">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild className={"cursor-pointer"}>
                        <div>
                          <Users />
                          <span>Manajemen Users</span>
                          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild className={"cursor-pointer"}>
                            <Link to="/list-role">
                              <IdCard />
                              <span>Role</span>
                            </Link>
                          </SidebarMenuButton>
                          <SidebarMenuButton asChild className={"cursor-pointer"}>
                            <Link to="list-karyawan">
                              <ShieldUser />
                              <span>Karyawan</span>
                            </Link>
                          </SidebarMenuButton>
                          <SidebarMenuButton asChild className={"cursor-pointer"}>
                            <Link to="list-anggota">
                              <UserCheck />
                              <span>Anggota</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
