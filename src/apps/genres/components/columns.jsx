import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { DialogForm } from "./DialogForm";

export const genreColumns = (page = 1, limit = 5) => [
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
    id: "id_genre",
    header: "No",
    cell: ({ row }) => {
      return <p>{(page - 1) * limit + (row.index + 1)}</p>;
    },
  },
  {
    accessorKey: "kd_genre",
    header: "Kode Genre",
  },
  {
    accessorKey: "name_genre",
    header: "Nama Genre",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-center">
          <DialogForm>
            <Button variant="warning" size="sm">
              Edit
            </Button>
          </DialogForm>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      );
    },
  },
];
