import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/pagination";
import { getPageWindow } from "@/helpers/getPageWindow";

export function DataTable({
  columns,
  data,
  setOpen,
  onEdit,
  pageIndex,
  pageSize,
  pageCount,
  onPaginationChange,
  onRequestDeleteSelected,
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const pages = getPageWindow(pageIndex, pageCount, 5);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
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

  const selected_genre_id = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id_genre);

  return (
    <div>
      <div className="overflow-hidden rounded-md border md:text-end p-5">
        <div className="md:flex justify-between items-center py-4">
          <Input
            placeholder="Filter nama genre..."
            value={table.getColumn("name_genre")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name_genre")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex gap-3">
            <Button
              className={"my-3"}
              variant={"primary"}
              click={() => {
                setOpen(true), onEdit(false);
              }}
            >
              Add Genre
            </Button>
            {selected_genre_id.length > 0 && (
              <Button
                className={"my-3"}
                variant={"destructive"}
                click={() => onRequestDeleteSelected(selected_genre_id)}
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={"text-center"}
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} pages={pages} />
    </div>
  );
}
