import { useSearchParams } from "react-router";
import { BookColumns } from "../components/Column";
import { DataTableBook } from "../components/DataTable";
import { useBooksContext } from "../context/BooksContext";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Confirmation } from "../../../helpers/confirmation";
import { useState } from "react";
import { AlertComponents } from "@/components/global/AlertComponents";
import { useMutationBook } from "../hooks/useMutationBook";

export const BookContent = () => {
  const { books, pagination, fetchBook } = useBooksContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState(null);
  const { loading, removed, removedSelected } = useMutationBook();

  const { openConfirm, openError } = Confirmation({
    setAlertConfig,
    setOpenAlert,
  });
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
    setSearchParams({ page: nextPage, limit: nextLimit });

    fetchBook(nextPage, nextLimit);
  };

  /* ---------------------------------------------- Section View ⬇️ ---------------------------------------------- */

  const handleRemoveSelected = (data) => {
    if (data.length === 0) return;

    openConfirm({
      title: "Apakah anda yakin ingin menghapus data berikut?",
      desc: "Jika anda menghapusnya maka data tersebut akan di hapus dari server dan tidak dapat pulihkan kembali",
      actionLabel: "Hapus",
      cancelLabel: "Batal",
      variant: "destructive",
      onConfirm: async () => {
        try {
          const res = await removedSelected(data);
          if (res?.success) {
            toast.success("Berhasil Menghapus data");
          }

          return res;
        } catch (err) {
          toast.error(err.message);
          openError("Maaf terjadi kesalahan saat ingin menghapus data");
        }
      },
    })
  }

  const handleRemove = (id_buku) => {
    openConfirm({
      title: "Apakah anda yakin ingin menghapus data berikut?",
      desc: "Jika anda menghapusnya maka data tersebut akan di hapus dari server dan tidak dapat pulihkan kembali",
      actionLabel: "Hapus",
      cancelLabel: "Batal",
      variant: "destructive",
      onConfirm: async () => {
        try {
          const res = await removed(id_buku);
          if (res?.success) {
            toast.success("Berhasil Menghapus data");
          }

          return res;
        } catch (err) {
          toast.error(err.message);
          openError("Maaf terjadi kesalahan saat ingin menghapus data");
        }
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Buku</h1>
      <p className="text-muted-foreground mb-6">
        Halaman ini menampilkan daftar buku yang tersedia.
      </p>

      <DataTableBook
        columns={BookColumns({ onRemoved: handleRemove })}
        data={books}
        pageIndex={pageIndex}
        pageCount={pageCount}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        onDeleteSelected={handleRemoveSelected}
      />

      <Toaster />

      {alertConfig && (
        <AlertComponents
          title={alertConfig.title}
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
    </div>
  );
};
