import { BookColumns } from "../components/Column";
import { DataTableBook } from "../components/DataTable";
import { useBooksContext } from "../context/BooksContext";

export const BookContent = () => {
  const { books } = useBooksContext();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Buku</h1>
      <p className="text-muted-foreground mb-6">
        Halaman ini menampilkan daftar buku yang tersedia.
      </p>

      <DataTableBook columns={BookColumns()} data={books} />
    </div>
  );
};
