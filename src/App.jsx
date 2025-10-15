import { Outlet } from "react-router";
import { HeaderApp } from "./components/layout/header";
import { AppSidebar } from "./components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <div className="bg-background">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <HeaderApp />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default App;
