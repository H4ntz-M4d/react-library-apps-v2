import { useLocation } from "react-router";
import { ColumnUsers } from "../components/ColumnUsers";
import { DataTableUsers } from "../components/DataTableUsers";
import { useFetchUsers } from "../hooks/useFetchUsers";

export const ListUsers = () => {
  const location = useLocation();
  const isKaryawan = location.pathname.includes("/list-karyawan");
  const role = isKaryawan ? 2 : 3;
  const { users } = useFetchUsers(role);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Halaman List Users</h1>
      <p className="text-muted-foreground mb-6">
        Ini merupakan halaman yang menampilkan list Users
      </p>

      <DataTableUsers columns={ColumnUsers()} data={users} />
    </div>
  );
};
