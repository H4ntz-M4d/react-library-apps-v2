import { LayoutDashboard, Boxes, LibraryBig, BookUp, BookDown, HandCoins } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
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
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
  )
}