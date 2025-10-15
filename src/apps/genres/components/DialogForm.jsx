import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogForm({ create, setFormData, formData, open, setOpen, isEdit, error, setError }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((draft) => {
      draft[name] = value;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await create(e); // panggil fungsi parent
    if (result?.success) {
      setOpen(false); // tutup dialog
    }
  };

  const handleClose = () => {
    setFormData({
      kd_genre: "",
      name_genre: "",
    });
    setOpen(false); // tutup dialog
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleClose()
      }
      setOpen(isOpen)
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!isEdit ? "Create Genre" : "Edit Genre"}</DialogTitle>
          <DialogDescription>
            Silahkan membuat sebuah genre baru. jika sudah selesai klik save
            changes untuk menyimpan
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Kode Genre</Label>
              <Input
                name={"kd_genre"}
                placeholder={"ex. KG007"}
                handlechange={handleChange}
                value={formData?.kd_genre || ""}
              />
              {error && (
                <FieldError>{error.kd_genre}</FieldError>
              )}
            </div>
            <div className="grid gap-3">
              <Label>Nama Genre</Label>
              <Input
                name={"name_genre"}
                placeholder={"ex. Adventure"}
                handlechange={handleChange}
                value={formData?.name_genre || ""}
              />
              {error && (
                <FieldError>{error.name_genre}</FieldError>
              )}
            </div>
          </div>
          <DialogFooter className={"mt-5"}>
            <Button type={"button"} variant="outline" click={() => handleClose()}>
              Cancel
            </Button>
            <Button type={"submit"}>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
