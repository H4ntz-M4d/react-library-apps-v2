import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const BookColumns = () => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "kd_buku",
    header: "Kode Buku",
  },
  {
    accessorKey: "nama_buku",
    header: "Kode Buku",
  },
  {
    accessorKey: "pengarang",
    header: "Pengarang",
  },
  {
    accessorKey: "penerbit",
    header: "Penerbit",
  },
  {
    accessorKey: "tahun_terbit",
    header: "Tahun Terbit",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-center">
          <Button variant={"warning"} size={"sm"}>
            Edit
          </Button>
          <Button variant={"warning"} size={"sm"}>
            Delete
          </Button>
        </div>
      );
    },
  },
];
