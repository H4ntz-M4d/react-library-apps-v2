import { useSearchParams } from "react-router";
import { RoleColumns } from "../components/ColumnRole";
import { DataTableRole } from "../components/DataTableRole";
import { useRoleContext } from "../context/RoleContext";
import { RoleForm } from "../components/RoleForm";
import { useState } from "react";
import { Confirmation } from "@/helpers/confirmation";
import { AlertComponents } from "@/components/global/AlertComponents";
import { Toaster } from "@/components/ui/sonner";
import { useMutationRoles } from "../hooks/useMutationRoles";
import { toast } from "sonner";

export const RoleContent = () => {
  const { role, pagination, fetchRole } = useRoleContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(null);
  const [alertConfig, setAlertConfig] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const { openConfirm, openError } = Confirmation({
    setAlertConfig,
    setOpenAlert,
  });

  const [formData, setFormData] = useState({
    nama_role: "",
  });

  const { remove } = useMutationRoles();

  const pageFromUrl = Number(searchParams.get("page") || 1);
  const limitFromUrl = Number(searchParams.get("limit") || 10);

  const pageIndex = (pageFromUrl ?? 1) - 1;
  const pageSize = limitFromUrl ?? 10;
  const pageCount = pagination.totalPages;

  /* ---------------------------------------------- Section Function ⬇️ ---------------------------------------------- */

  const handlePaginationChange = (updater) => {
    const next =
      typeof updater === "function"
        ? updater({ pageIndex, pageSize })
        : updater;

    const nextPage = (next.pageIndex ?? pageIndex) + 1;
    const nextLimit = next.pageSize ?? pageSize;

    setSearchParams({ page: String(nextPage), limit: String(nextLimit) });
    fetchRole(nextPage, nextLimit);
  };

  const handleDelete = (id_role) => {
    openConfirm({
      title: "Apakah anda yakin ingin menghapus data ini?",
      desc: "Jika anda menghapusnya maka data ini tidak akan dapat dipulihkan lagi!",
      actionLabel: "Lanjut",
      cancelLabel: "Batal",
      onConfirm: async () => {
        try {
          const res = await remove(id_role)
          if (res.success) {
            toast.success("Data berhasil dihapus")
          }
          return res
        } catch (error) {
          toast.error("Maaf terjadi kesalahan saat ingin menghapus data")
          throw error
        }
      }
    })
  }

  /* ---------------------------------------------- Section View ⬇️ ---------------------------------------------- */

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ini Halaman List Role</h1>
      <p className="text-muted-foreground mb-6">
        Halaman ini menampilkan daftar role yang tersedia
      </p>

      <DataTableRole
        columns={RoleColumns({
          setEdit: setEdit,
          setOpen: setOpen,
          setFormData: setFormData,
          onRemoved: handleDelete,
        })}
        data={role}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageCount}
        onPaginationChange={handlePaginationChange}
        setOpen={setOpen}
      />

      <RoleForm
        open={open}
        setOpen={setOpen}
        isEdit={isEdit}
        setEdit={setEdit}
        openConfirm={openConfirm}
        formData={formData}
        setFormData={setFormData}
      />

      <Toaster />

      {alertConfig && (
        <AlertComponents
          title={alertConfig.title}
          desc={alertConfig.desc}
          icon={alertConfig.icon}
          actionLabel={alertConfig.actionLabel}
          cancelLabel={alertConfig.cancelLabel}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          onCancel={() => setOpenAlert(false)}
          onConfirm={async () => {
            if (!alertConfig.onConfirm) {
              return setOpenAlert(false);
            }
            try {
              await alertConfig.onConfirm();
            } catch (error) {
              setOpenAlert(false);
              openAlert(error?.message || "Operasi gagaal dijalankan");
            }
          }}
          variant={alertConfig.variant}
        />
      )}
    </div>
  );
};
