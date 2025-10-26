import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { HeaderApp } from "./components/layout/header";
import { AppSidebar } from "./components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { LoadingScreen } from "./components/global/LoadingScreen";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // simulasi waktu transisi halaman
    const timeout = setTimeout(() => setLoading(false), 800);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="bg-background">
      {loading && <LoadingScreen />}
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
