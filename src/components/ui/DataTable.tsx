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

// TanStack's size/minSize/maxSize are plain numbers that aren't applied to the
// DOM by default. We surface them as inline styles so a column can declare its
// width directly (e.g. `maxSize: 192`). maxWidth must sit on a block element
// inside the cell — applied to the <td> it is ignored for nowrap content in an
// auto-layout table, so the truncation/ellipsis never triggers.
function getSizingStyle(columnDef: {
  size?: number;
  minSize?: number;
  maxSize?: number;
}): React.CSSProperties | undefined {
  const style: React.CSSProperties = {};
  if (columnDef.size != null) style.width = columnDef.size;
  if (columnDef.minSize != null) style.minWidth = columnDef.minSize;
  if (columnDef.maxSize != null) style.maxWidth = columnDef.maxSize;
  return Object.keys(style).length > 0 ? style : undefined;
}

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
  fillHeight?: boolean;
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
  fillHeight = false,
  desktopContainerClassName = fillHeight
    ? "hidden sm:flex sm:flex-col flex-1 min-h-0 overflow-hidden rounded-xl border border-slate-200 bg-white"
    : "hidden sm:block overflow-x-auto rounded-xl border border-slate-200 bg-white",
  mobileContainerClassName = "sm:hidden flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white",
  headerRowClassName = fillHeight
    ? "bg-slate-50 hover:bg-slate-50 sticky top-0 z-10"
    : "bg-slate-50 hover:bg-slate-50",
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
        <Table
          containerClassName={
            fillHeight ? "flex-1 min-h-0 overflow-auto" : undefined
          }
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={headerRowClassName}>
                {headerGroup.headers.map((header) => {
                  const sizingStyle = getSizingStyle(header.column.columnDef);
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.column.columnDef.meta?.headerClassName,
                      )}
                    >
                      {header.isPlaceholder ? null : sizingStyle ? (
                        <div
                          className="min-w-0 overflow-hidden"
                          style={sizingStyle}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className={bodyRowClassName}>
                {row.getVisibleCells().map((cell) => {
                  const sizingStyle = getSizingStyle(cell.column.columnDef);
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(cell.column.columnDef.meta?.cellClassName)}
                    >
                      {sizingStyle ? (
                        <div
                          className="min-w-0 overflow-hidden"
                          style={sizingStyle}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default DataTable;
