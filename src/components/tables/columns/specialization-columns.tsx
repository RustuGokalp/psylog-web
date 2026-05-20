"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Specialization } from "@/types/specialization";
import { formatTurkishDateTime } from "@/lib/format";
import { TableAction } from "@/components/tables/table-action";

export interface SpecializationColumnHandlers {
  onEdit: (id: number) => void;
  onDelete: (item: Specialization) => void;
}

export function createSpecializationColumns(
  handlers: SpecializationColumnHandlers,
): ColumnDef<Specialization>[] {
  return [
    {
      id: "title",
      header: "Başlık",
      meta: {
        headerClassName: "font-semibold text-slate-600",
      },
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="font-medium text-slate-800 line-clamp-1">
            {item.title}
          </p>
        );
      },
    },
    {
      id: "slug",
      header: "Slug",
      meta: {
        headerClassName: "hidden md:table-cell font-semibold text-slate-600",
        cellClassName: "hidden md:table-cell text-sm text-slate-500 font-mono",
      },
      cell: ({ row }) => {
        const item = row.original;
        return <>{item.slug}</>;
      },
    },
    {
      id: "order",
      header: "Sıra",
      meta: {
        headerClassName: "font-semibold text-slate-600 text-center",
        cellClassName: "text-center text-sm text-slate-500",
      },
      cell: ({ row }) => {
        const item = row.original;
        return <>{item.displayOrder ?? "—"}</>;
      },
    },
    {
      id: "createdAt",
      header: "Oluşturulma",
      meta: {
        headerClassName: "hidden lg:table-cell font-semibold text-slate-600",
        cellClassName:
          "hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap",
      },
      cell: ({ row }) => {
        const item = row.original;
        return <>{formatTurkishDateTime(item.createdAt)}</>;
      },
    },
    {
      id: "updatedAt",
      header: "Güncelleme",
      meta: {
        headerClassName: "hidden lg:table-cell font-semibold text-slate-600",
        cellClassName:
          "hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap",
      },
      cell: ({ row }) => {
        const item = row.original;
        return (
          <>{item.updatedAt ? formatTurkishDateTime(item.updatedAt) : "—"}</>
        );
      },
    },
    {
      id: "actions",
      header: "Aksiyonlar",
      meta: {
        headerClassName: "w-24 text-center font-semibold text-slate-600",
      },
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center justify-center gap-1">
            <TableAction
              tooltip="Düzenle"
              tone="amber"
              icon={Pencil}
              onClick={() => handlers.onEdit(item.id)}
            />
            <TableAction
              tooltip="Sil"
              tone="red"
              icon={Trash2}
              onClick={() => handlers.onDelete(item)}
            />
          </div>
        );
      },
    },
  ];
}
