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
                  <a href="#">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </a>
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
                            <a href="/list-role">
                              <IdCard />
                              <span>Role</span>
                            </a>
                          </SidebarMenuButton>
                          <SidebarMenuButton asChild className={"cursor-pointer"}>
                            <div>
                              <ShieldUser />
                              <span>Karyawan</span>
                            </div>
                          </SidebarMenuButton>
                          <SidebarMenuButton asChild className={"cursor-pointer"}>
                            <div>
                              <UserCheck />
                              <span>Anggota</span>
                            </div>
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
