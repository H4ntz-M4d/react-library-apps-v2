import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function DialogForm({ children, create, setFormData, formData }) {
  const [open, setOpen] = useState(false);

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
        name_genre: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (isOpen == false) {
            handleClose()
        }
        setOpen(isOpen)
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Genre</DialogTitle>
          <DialogDescription>
            Silahkan membuat sebuah genre baru. jika sudah selesai klik save
            changes untuk menyimpan
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Kode Genre</Label>
              <Input
                name={"kd_genre"}
                placeholder={"ex. KG007"}
                handlechange={handleChange}
                value={formData?.kd_genre || ""}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Nama Genre</Label>
              <Input
                name={"name_genre"}
                placeholder={"ex. Adventure"}
                handlechange={handleChange}
                value={formData?.name_genre || ""}
              />
            </div>
          </div>
          <DialogFooter className={"mt-5"}>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type={"submit"}>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
