"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { ContactMessage } from "@/types/contact";
import { formatTurkishDateTime } from "@/lib/format";
import { TableAction } from "@/components/tables/table-action";

export interface ContactColumnHandlers {
  onView: (m: ContactMessage) => void;
}

export function createContactColumns(
  handlers: ContactColumnHandlers,
): ColumnDef<ContactMessage>[] {
  return [
    {
      id: "fullName",
      header: "Ad Soyad",
      meta: {
        headerClassName: "font-semibold text-slate-600",
        cellClassName: "font-medium text-slate-800 whitespace-nowrap",
      },
      cell: ({ row }) => {
        const m = row.original;
        return <>{m.fullName}</>;
      },
    },
    {
      id: "email",
      header: "E-posta",
      meta: {
        headerClassName: "font-semibold text-slate-600",
        cellClassName: "text-sm text-slate-600",
      },
      cell: ({ row }) => {
        const m = row.original;
        return <>{m.email}</>;
      },
    },
    {
      id: "subject",
      header: "Konu",
      meta: {
        headerClassName: "font-semibold text-slate-600",
        cellClassName: "text-sm text-slate-600 max-w-48",
      },
      cell: ({ row }) => {
        const m = row.original;
        return <p className="line-clamp-1">{m.subject}</p>;
      },
    },
    {
      id: "phone",
      header: "Telefon",
      meta: {
        headerClassName: "hidden md:table-cell font-semibold text-slate-600",
        cellClassName:
          "hidden md:table-cell text-sm text-slate-500 whitespace-nowrap",
      },
      cell: ({ row }) => {
        const m = row.original;
        return (
          <>{m.mobilePhone ?? <span className="text-slate-300">—</span>}</>
        );
      },
    },
    {
      id: "date",
      header: "Tarih",
      meta: {
        headerClassName: "hidden lg:table-cell font-semibold text-slate-600",
        cellClassName:
          "hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap",
      },
      cell: ({ row }) => {
        const m = row.original;
        return <>{formatTurkishDateTime(m.createdAt)}</>;
      },
    },
    {
      id: "actions",
      header: "Action",
      meta: {
        headerClassName: "w-16 text-center font-semibold text-slate-600",
        cellClassName: "text-center",
      },
      cell: ({ row }) => {
        const m = row.original;
        return (
          <TableAction
            tooltip="Detayı gör"
            tone="blue"
            icon={Eye}
            onClick={() => handlers.onView(m)}
          />
        );
      },
    },
  ];
}
