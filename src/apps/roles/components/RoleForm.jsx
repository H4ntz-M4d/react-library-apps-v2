import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import z from "zod";
import { useMutationRoles } from "../hooks/useMutationRoles";
import { toast } from "sonner";

const formSchema = z.object({
  nama_role: z.string().nonempty({ message: "Field harus di isi" }),
});

export function RoleForm({
  open,
  setOpen,
  isEdit,
  setEdit,
  openConfirm,
  formData,
  setFormData,
}) {
  const { create, update, isLoading} = useMutationRoles();

  /* ---------------------------------------------- Section Function ⬇️ ---------------------------------------------- */

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_role: "",
    },
  });

  useEffect(() => {
    form.reset({
      nama_role: formData.nama_role || "",
    });
  }, [formData, form]);

  const onSubmit = (data) => {
    if (data) {
      openConfirm({
        title: "Apakah anda yakin ingin menambahkan role?",
        desc: "Jika anda yakin silahkan klik confirm",
        cancelLabel: "Batal",
        actionLabel: "Lanjut",
        variant: "confirm",
        onConfirm: async () => {
          if (isEdit) {
            try {
              const res = await update(isEdit, data)
              if (res.success) {
                toast.success("Data berhasil diupdate")
                setOpen(false)
              }
              return res
            } catch (error) {
              throw error
            }
          } else {
            try {
              const res = await create(data)
              if (res.success) {
                toast.success("Data berhasil ditambahkan")
                setOpen(false)
              }
              return res
            } catch (error) {
              throw error
            }
          }
        },
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setEdit(null);
          setFormData({
            nama_role: "",
          });
        }
        setOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!isEdit ? "Create Role" : "Edit Role"}</DialogTitle>
          <DialogDescription>
            Silahkan {!isEdit ? "membuat" : "mengedit"} sebuah role baru. jika
            sudah selesai klik save changes untuk menyimpan
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="nama_role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Role</FormLabel>
                  <FormControl>
                    <Input placeholder={"role"} type={"text"} {...field} />
                  </FormControl>
                  <FormDescription>
                    Silahkan isi nama role yang diinginkan
                  </FormDescription>
                </FormItem>
              )}
            />
            <DialogFooter className={"mt-5"}>
              <Button type={"button"} variant="outline">
                Cancel
              </Button>
              <Button type={"submit"} disabled={isLoading} className={isLoading ? "opacity-60" : ""}> {isLoading ? "Loading..." : "Save changes"} </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
