import { useGenres } from "@/apps/genres/hooks/useGenres";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useMutationBook } from "../hooks/useMutationBook";
import { useEffect, useState } from "react";
import { AlertGenre } from "@/apps/genres/components/AlertGenre";
import { Confirmation } from "../helpers/confirmation";
import { genreHelpers } from "../helpers/genreHelpers";

export const CreateUpdateContent = () => {
  const { genre } = useGenres();
  const { add, edit, loading, formData, setFormData, isEdit, loadBookById, error } =
    useMutationBook();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState(null);
  const { addGenre, updateGenreAt, removeGenreAt } = genreHelpers(setFormData);
  const { openConfirm, openError } = Confirmation({setAlertConfig, setOpenAlert});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get("edit");
    if (editId) {
      loadBookById(editId);
    }
  }, []); // hanya jalan sekali saat mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((draft) => {
      draft[name] = value;
    });
  };

  const handleSubmit = () => {
    openConfirm({
      title: isEdit ? "Simpan perubahan baru" : "Simpan data baru",
      desc: "Pastikan data sudah benar sebelum disimpan.",
      actionLabel: "Simpan",
      cancelLabel: "Batal",
      variant: "confirm",
      onConfirm: async () => {
        try {
          if (isEdit) {
            const res = await edit(isEdit, formData);
            if (res?.success) {
              setFormData({
                kd_buku: "",
                nama_buku: "",
                pengarang: "",
                penerbit: "",
                tahun_terbit: "",
                id_genre: [""],
              });

              toast.success("Berhasil mengubah data");
            }
            return res;
          } else {
            const res = await add(formData);
            if (res?.success) {
              setFormData({
                kd_buku: "",
                nama_buku: "",
                pengarang: "",
                penerbit: "",
                tahun_terbit: "",
                id_genre: [""],
              });

              toast.success("Berhasil menambahkan data");
            }
            return res;
          }
        } catch (err) {
          toast.error(err.message);
          openError("Silahkan cek kembali form anda. Pastikan tidak ada data yang kosong atau tidak terisi")
        }
      },
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Book</h1>
      <p className="text-muted-foreground mb-6">
        Halaman ini menampilkan form untuk menambah Buku
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Form Create Book</CardTitle>
          <CardDescription>
            Masukkan data buku ke form berikut. Setelah selesai silahkan diklik
            tombol submit untuk menyimpan data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitForm}>
            <div>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <Label className={"sm:w-50 lg:w-100"}>Kode Buku</Label>
                <Input
                  type={"text"}
                  name={"kd_buku"}
                  handlechange={handleChange}
                  value={formData?.kd_buku || ""}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <Label className={"sm:w-50 lg:w-100"}>Nama Buku</Label>
                <Input
                  type={"text"}
                  name={"nama_buku"}
                  handlechange={handleChange}
                  value={formData?.nama_buku || ""}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <Label className={"sm:w-50 lg:w-100"}>Pengarang</Label>
                <Input
                  type={"text"}
                  name={"pengarang"}
                  handlechange={handleChange}
                  value={formData?.pengarang || ""}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <Label className={"sm:w-50 lg:w-100"}>Penerbit</Label>
                <Input
                  type={"text"}
                  name={"penerbit"}
                  handlechange={handleChange}
                  value={formData?.penerbit || ""}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <Label className={"sm:w-50 lg:w-100"}>Tahun</Label>
                <Input
                  type={"text"}
                  name={"tahun_terbit"}
                  handlechange={handleChange}
                  value={formData?.tahun_terbit || ""}
                />
              </div>
              {genre?.length > 0 &&
                formData.id_genre.map((selected, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-3 mb-4"
                  >
                    <Label className={"sm:w-50 lg:w-100"}>
                      Genre {index + 1}
                    </Label>

                    <div className="flex w-full items-center gap-2">
                      <Select
                        value={selected}
                        onValueChange={(val) => updateGenreAt(index, val)}
                      >
                        <SelectTrigger className={"w-full"}>
                          <SelectValue placeholder={"Select Genre"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Genre</SelectLabel>
                            {genre?.map((value) => (
                              <SelectItem
                                key={value.id_genre}
                                value={String(value.id_genre)} // jadikan string
                                className={"px-8"}
                              >
                                {value.name_genre}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {formData.id_genre.length > 1 && (
                        <Button
                          type={"button"}
                          variant={"destructive"}
                          size={"sm"}
                          click={() => removeGenreAt(index)}
                        >
                          Hapus
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              <Button
                type={"button"}
                variant={"outline"}
                size={"sm"}
                click={addGenre}
                className={"mb-10"}
              >
                + Tambah Genre
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/books">
                <Button type={"button"} variant={"destructive"}>
                  Back
                </Button>
              </a>
              <Button type={"submit"} variant={"primary"}>
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Toaster />

      {alertConfig && (
        <AlertGenre
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
