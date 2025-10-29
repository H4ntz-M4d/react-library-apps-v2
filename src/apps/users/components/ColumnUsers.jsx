import { Button } from "@/components/ui/button";

export const ColumnUsers = () => [
  {
    accessorKey: "id_user",
    header: "No",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      if (!role) {
        return "-";
      }
      return (
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {role?.nama_role}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
          <Button variant={"warning"}>Edit</Button>
          <Button variant={"destructive"}>Delete</Button>
        </div>
      );
    },
  },
];
