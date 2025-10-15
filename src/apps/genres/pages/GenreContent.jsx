import { useGenresContext } from "../context/GenreContext";
import { DataTable } from "../components/DataTable";
import { genreColumns } from "../components/columns";
import { useMutationGenre } from "../hooks/useMutationGenre";
import { useImmer } from "use-immer";

export default function GenreContent() {
  const { genre, pagination, fetchGenre } = useGenresContext();
  const { add, loading } = useMutationGenre();
  const [formData, setFormData] = useImmer({
    kd_genre: "",
    name_genre: ""
  })

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    loading
    try {
      const res = await add(formData)
      if (res?.success) {
        setFormData({
          kd_genre: "",
          name_genre: ""
        })
      }
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Daftar Genre</h1>
        <p className="text-muted-foreground mb-6">
          Halaman ini menampilkan daftar genre buku yang tersedia.
        </p>

        {genre.length > 0 ? (
          <DataTable
            columns={genreColumns(pagination.page, pagination.limit)}
            data={genre}
            onCreate={handleAddOrUpdate}
            setFormData={setFormData}
            formData={formData}
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
    </>
  );
}
