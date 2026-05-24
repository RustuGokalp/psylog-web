"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { ContactMessage } from "@/types/contact";
import { formatTurkishDateTime } from "@/lib/format";
import { TableAction } from "@/components/tables/table-action";
import { OverflowTooltip } from "@/components/ui/tooltip";

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
      maxSize: 160,
      meta: {
        headerClassName: "font-semibold text-slate-600",
        cellClassName: "font-medium text-slate-800",
      },
      cell: ({ row }) => {
        const m = row.original;
        return (
          <OverflowTooltip as="p" text={m.fullName} className="truncate" />
        );
      },
    },
    {
      id: "email",
      header: "E-posta",
      maxSize: 192,
      meta: {
        headerClassName: "font-semibold text-slate-600",
        cellClassName: "text-sm text-slate-600",
      },
      cell: ({ row }) => {
        const m = row.original;
        return <OverflowTooltip as="p" text={m.email} className="truncate" />;
      },
    },
    {
      id: "subject",
      header: "Konu",
      maxSize: 192,
      meta: {
        headerClassName: "font-semibold text-slate-600",
        cellClassName: "text-sm text-slate-600",
      },
      cell: ({ row }) => {
        const m = row.original;
        return <OverflowTooltip as="p" text={m.subject} className="truncate" />;
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
      maxSize: 130,
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
      maxSize: 135,
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
      maxSize: 80,
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
