import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const RoleColumns = ({ onRemoved, setEdit, setOpen, setFormData }) => [
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
    accessorKey: "id_role",
    header: "No.",
    cell: ({ row }) => <p> {row.index + 1} </p>,
  },
  {
    accessorKey: "nama_role",
    header: "Nama Role",
  },
  //   {
  //     accessorKey: "buku_genre",
  //     header: "Genre",
  //     cell: ({ row }) => {
  //       const genres = row.original.buku_genre;
  //       if (!genres || !Array.isArray(genres)) return "-";

  //       return (
  //         <div className="flex flex-wrap gap-1">
  //           {genres.map((item, index) => (
  //             <span
  //               key={index}
  //               className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
  //             >
  //               {item.genre?.name_genre || "-"}
  //             </span>
  //           ))}
  //         </div>
  //       );
  //     },
  //   },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-center">
          <Button
            variant={"warning"}
            size={"sm"}
            click={() => {
              setEdit(row.original.id_role), setOpen(true), setFormData({
                nama_role: row.original.nama_role
              });
            }}
          >
            Edit
          </Button>
          <Button
            variant={"destructive"}
            size={"sm"}
            click={() => onRemoved(row.original.id_role)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
