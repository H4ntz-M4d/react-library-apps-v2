import { useGenresContext } from "../context/GenreContext";
import { DataTable } from "../components/DataTable";
import { genreColumns } from "../components/columns";
import { useMutationGenre } from "../hooks/useMutationGenre";
import { useImmer } from "use-immer";
import { useState } from "react";
import { DialogForm } from "../components/DialogForm";
import { AlertGenre } from "../components/AlertGenre";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useSearchParams } from "react-router";

export default function GenreContent() {
  const { genre, pagination, fetchGenre } = useGenresContext();
  const {
    add,
    edit,
    removed,
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
        toast("Event has been created.");
      },
    });
  };

  const openConfirm = (config) => {
    // default
    const defaults = {
      title: "Konfirmasi",
      desc: "Apakah Anda yakin?",
      actionLabel: "Lanjut",
      cancelLabel: "Batal",
      variant: "confirm",
      onConfirm: null,
    };
    setAlertConfig({ ...defaults, ...config });
    setOpenAlert(true);
  };

  const openError = (message) => {
    setAlertConfig({
      title: "Terjadi kesalahan",
      desc: message ?? "Gagal memproses permintaan.",
      actionLabel: "OK",
      cancelLabel: null, // tidak tampilkan tombol cancel
      variant: "error",
      onConfirm: () => setOpenAlert(false),
    });
    setOpenAlert(true);
  };

  const pageFromUrl = Number(searchParams.get('page') || 1);
  const limitFromUrl = Number(searchParams.get('limit') || 10);

  const pageIndex = (pageFromUrl ?? 1) - 1;
  const pageSize = limitFromUrl ?? 10;
  const pageCount = pagination.totalPages;

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

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Daftar Genre</h1>
        <p className="text-muted-foreground mb-6">
          Halaman ini menampilkan daftar genre buku yang tersedia.
        </p>

        {genre.length > 0 ? (
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
            onCreate={handleAddOrUpdate}
            setFormData={setFormData}
            formData={formData}
            setOpen={setOpen}
            onEdit={setEdit}
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={pageCount}
            onPaginationChange={handlePaginationChange}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Tidak ada data genre yang tersedia.
            </p>
          </div>
        )}

        {pagination && (
          <div className="mt-4 text-sm text-muted-foreground">
            Menampilkan {genre.length} dari {pagination.total} genre
          </div>
        )}
      </div>

      {alertConfig && (
        <AlertGenre
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
