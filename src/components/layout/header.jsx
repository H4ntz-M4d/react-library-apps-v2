import { LogOut, OctagonAlert } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Confirmation } from "@/helpers/confirmation";
import { AlertComponents } from "../global/AlertComponents";
import { useAuth } from "@/apps/auth/hooks/useAuth";
import { useAuthContext } from "@/apps/auth/context/AuthContext";

export const HeaderApp = () => {
  const { check } = useAuthContext();
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState();
  const [alertConfig, setAlertConfig] = useState();
  const {loading, signOut} = useAuth()
  const { openConfirm } = Confirmation({ setAlertConfig, setOpenAlert });

  const handleLogout = async () => {
    try {
      // console.log(check);
      const out = await signOut(check);
      if (out?.success) {
        navigate("/login");
      }
      return out;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            click={() => {
              openConfirm({
                title: "Anda yakin ingin keluar?",
                icon: <OctagonAlert size={"130"} color="#ff0000" />,
                desc: "Keluar dari akun anda",
                actionLabel: "Keluar",
                cancelLabel: "Batal",
                variant: "confirm",
                onConfirm: () => {handleLogout()}
              })
              
            }}
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </div>
      {alertConfig && (
        <AlertComponents
          title={alertConfig.title}
          icon={alertConfig.icon}
          desc={alertConfig.desc}
          actionLabel={alertConfig.actionLabel}
          cancelLabel={alertConfig.cancelLabel}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          isLoading={loading}
          onCancel={() => setOpenAlert(false)}
          onConfirm={async () => {
            if (!alertConfig.onConfirm) return setOpenAlert(false);
            try {
              await alertConfig.onConfirm(); // jalankan aksi yang dikonfirmasi
            } catch (err) {
              // Jika aksi gagal, tampilkan error alert
              setOpenAlert(false);
              openError(err?.message || "Operasi gagal dijalankan.");
            }
          }}
          variant={alertConfig.variant}
        />
      )}
    </header>
  );
};
