import { useGenresContext } from "../context/GenreContext";
import { DataTable } from "../components/DataTable";
import { genreColumns } from "../components/columns";
import { useMutationGenre } from "../hooks/useMutationGenre";
import { useImmer } from "use-immer";
import { useState } from "react";
import { DialogForm } from "../components/DialogForm";
import { AlertComponents } from "../../../components/global/AlertComponents";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useSearchParams } from "react-router";
import { Confirmation } from "@/helpers/confirmation";

export default function GenreContent() {
  const { genre, pagination, fetchGenre } = useGenresContext();
  const {
    add,
    edit,
    removed,
    removedSelected,
    loading,
    error,
    validationErrors,
    setValidationErrors,
  } = useMutationGenre();
  const [formData, setFormData] = useImmer({
    kd_genre: "",
    name_genre: "",
  });
  const [isEdit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [id, setId] = useState([]);
  const [alertConfig, setAlertConfig] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { openConfirm, openError } = Confirmation({setAlertConfig, setOpenAlert});

  const pageFromUrl = Number(searchParams.get('page') || 1);
  const limitFromUrl = Number(searchParams.get('limit') || 10);

  const pageIndex = (pageFromUrl ?? 1) - 1;
  const pageSize = limitFromUrl ?? 10;
  const pageCount = pagination.totalPages;

  /* ---------------------------------------------- Section Function ⬇️ ---------------------------------------------- */

  const onRequestSave = (isEdit, formData, idForEdit) => {
    openConfirm({
      title: isEdit ? "Simpan perubahan?" : "Simpan data baru?",
      desc: "Pastikan data sudah benar sebelum disimpan.",
      actionLabel: "Simpan",
      cancelLabel: "Batal",
      variant: "confirm",
      onConfirm: async () => {
        try {
          if (isEdit) {
            const res = await edit(idForEdit, formData);
            if (res?.success) {
              setOpen(false);
              setFormData({
                kd_genre: "",
                name_genre: "",
              });

              toast.success(
                isEdit
                  ? "Berhasil Mengupdate Data"
                  : "Berhasil Menambahkan Data"
              );
            }
            return res;
          } else {
            const res = await add(formData);
            if (res?.success) {
              setOpen(false);
              setFormData({
                kd_genre: "",
                name_genre: "",
              });

              toast.success(
                isEdit
                  ? "Berhasil Mengupdate Data"
                  : "Berhasil Menambahkan Data"
              );
            }
            return res;
          }
        } catch (err) {
          toast.error(err.message);
        }
        // tutup form dialog dan reset form setelah berhasil
      },
    });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    onRequestSave(isEdit, formData, id);
  };

  const onRequestDelete = (id) => {
    openConfirm({
      title: "Apakah anda yakin ingin menghapus data ini?",
      desc: "Jika anda setuju, data akan dihapus dari penyimpanan dan tidak bisa digunakan lagi.",
      actionLabel: "Hapus",
      cancelLabel: "Batal",
      variant: "destructive",
      onConfirm: async () => {
        await removed(id);
        toast("Data telah berhasil dihapus.");
      },
    });
  };

  const onRequestDeleteSelected = (id_genre_Selected) => {
    openConfirm({
      title: "Apakah anda yakin ingin menghapus data ini?",
      desc: "Jika anda setuju, data akan dihapus dari penyimpanan dan tidak bisa digunakan lagi.",
      actionLabel: "Hapus",
      cancelLabel: "Batal",
      variant: "destructive",
      onConfirm: async () => {
        await removedSelected(id_genre_Selected);
        toast("Data telah berhasil dihapus.");
      },
    });
  };

  const handlePaginationChange = (updater) => {
    const next =
      typeof updater === "function"
        ? updater({ pageIndex, pageSize })
        : updater;

    // react-table 0-based → API 1-based
    const nextPage = (next.pageIndex ?? pageIndex) + 1;
    const nextLimit = next.pageSize ?? pageSize;
    setSearchParams({ page: String(nextPage), limit: String(nextLimit) })

    fetchGenre(nextPage, nextLimit);
  };

  /* ---------------------------------------------- Section View ⬇️ ---------------------------------------------- */

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Daftar Genre</h1>
        <p className="text-muted-foreground mb-6">
          Halaman ini menampilkan daftar genre buku yang tersedia.
        </p>

        <DataTable
          columns={genreColumns({
            page: pagination.page,
            limit: pagination.limit,
            setOpen: setOpen,
            onEdit: setEdit,
            setId,
            setFormData,
            onRequestDelete,
          })}
          data={genre}
          setOpen={setOpen}
          onEdit={setEdit}
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageCount={pageCount}
          onPaginationChange={handlePaginationChange}
          onRequestDeleteSelected={onRequestDeleteSelected}
        />

        {pagination && (
          <div className="mt-4 text-sm text-muted-foreground">
            Menampilkan {genre.length} dari {pagination.total} genre
          </div>
        )}
      </div>

      {alertConfig && (
        <AlertComponents
          title={alertConfig.title}
          desc={alertConfig.desc}
          actionLabel={alertConfig.actionLabel}
          cancelLabel={alertConfig.cancelLabel}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          isLoading={confirmLoading}
          onCancel={() => setOpenAlert(false)}
          onConfirm={async () => {
            if (!alertConfig.onConfirm) return setOpenAlert(false);
            try {
              setConfirmLoading(true);
              await alertConfig.onConfirm(); // jalankan aksi yang dikonfirmasi
              setOpenAlert(false);
            } catch (err) {
              // Jika aksi gagal, tampilkan error alert
              setOpenAlert(false);
              openError(err?.message || "Operasi gagal dijalankan.");
            } finally {
              setConfirmLoading(false);
            }
          }}
          variant={alertConfig.variant}
        />
      )}

      <Toaster />

      <DialogForm
        create={handleAddOrUpdate}
        setFormData={setFormData}
        formData={formData}
        open={open}
        setOpen={setOpen}
        isEdit={isEdit}
        error={validationErrors}
        setError={setValidationErrors}
      />
    </>
  );
}
