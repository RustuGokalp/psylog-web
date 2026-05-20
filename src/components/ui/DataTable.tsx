"use client";

import React from "react";
import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

declare module "@tanstack/react-table" {
  // Type params must exactly match TanStack's ColumnMeta signature for
  // declaration merging (interface merging requires identical type-parameter
  // names). They are intentionally unused here.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClassName?: string;
    cellClassName?: string;
  }
}

interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  renderMobileCard?: (row: TData) => React.ReactNode;
  emptyState?: React.ReactNode;
  getRowId?: (row: TData) => string;
  desktopContainerClassName?: string;
  mobileContainerClassName?: string;
  headerRowClassName?: string;
  bodyRowClassName?: string;
}

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  renderMobileCard,
  emptyState,
  getRowId,
  desktopContainerClassName = "hidden sm:block overflow-x-auto rounded-xl border border-slate-200 bg-white",
  mobileContainerClassName = "sm:hidden flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white",
  headerRowClassName = "bg-slate-50 hover:bg-slate-50",
  bodyRowClassName = "hover:bg-slate-50",
}: DataTableProps<TData, TValue>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
  });

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <>
      {/* Mobile card list */}
      {renderMobileCard && (
        <div className={mobileContainerClassName}>
          {data.map((row, index) => (
            <React.Fragment key={getRowId?.(row) ?? index}>
              {renderMobileCard(row)}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Desktop table */}
      <div className={desktopContainerClassName}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={headerRowClassName}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      header.column.columnDef.meta?.headerClassName,
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className={bodyRowClassName}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(cell.column.columnDef.meta?.cellClassName)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default DataTable;
