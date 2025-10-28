import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/pagination";
import { getPageWindow } from "@/helpers/getPageWindow";
import { Button } from "@/components/ui/button";

export const DataTableRole = ({
  columns,
  data,
  pageIndex,
  pageCount,
  pageSize,
  onPaginationChange,
  onDeleteSelected,
  setOpen
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const pages = getPageWindow(pageIndex, pageCount, 5);
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount,
    state: {
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange,
  });

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id_role);

  return (
    <div>
      <div className="overflow-hidden rounded-md border md:text-end p-5">
        <div className="md:flex justify-between items-center py-4">
          <Input
            placeholder="Filter nama Role..."
            value={table.getColumn("nama_role")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("nama_role")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <div className="flex gap-2">
            <Button size="sm" type="button" click={() => setOpen(true)} variant="primary">
              Create Role
            </Button>

            {selectedIds.length > 0 && (
              <Button
                size="sm"
                type="button"
                variant="destructive"
                click={() => onDeleteSelected(selectedIds)}
              >
                Delete Selected
              </Button>
            )}
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={"text-center"}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    className={"text-center"}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} pages={pages} />
    </div>
  );
};
