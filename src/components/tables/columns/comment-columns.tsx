"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Check, Trash2, X } from "lucide-react";
import { CommentAdminResponse } from "@/types/post";
import { formatTurkishDateTime } from "@/lib/format";
import { TableAction } from "@/components/tables/table-action";
import { OverflowTooltip } from "@/components/ui/tooltip";

function StatusBadge({ status }: { status: CommentAdminResponse["status"] }) {
  const map = {
    APPROVED: {
      label: "Onaylı",
      className: "bg-green-100 text-green-700 border-green-200",
    },
    REJECTED: {
      label: "Reddedildi",
      className: "bg-red-100 text-red-600 border-red-200",
    },
    PENDING: {
      label: "Bekliyor",
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
  };
  const { label, className } = map[status];
  return <Badge className={className}>{label}</Badge>;
}

export { StatusBadge as CommentStatusBadge };

export interface CommentColumnHandlers {
  onApprove: (c: CommentAdminResponse) => void;
  onReject: (c: CommentAdminResponse) => void;
  onDelete: (c: CommentAdminResponse) => void;
  processingId: number | null;
}

export function createCommentColumns(
  handlers: CommentColumnHandlers,
): ColumnDef<CommentAdminResponse>[] {
  return [
    {
      id: "post",
      header: "Yazı",
      maxSize: 160,
      meta: {
        headerClassName: "font-semibold text-slate-600",
      },
      cell: ({ row }) => {
        const c = row.original;
        return (
          <OverflowTooltip
            as={Link}
            href={`/yazilarim/${c.postSlug}`}
            target="_blank"
            text={c.postTitle}
            className="block truncate text-sm font-medium text-violet-600 hover:underline"
          />
        );
      },
    },
    {
      id: "author",
      header: "Yazar",
      maxSize: 160,
      meta: {
        headerClassName: "font-semibold text-slate-600",
        cellClassName: "text-sm font-medium text-slate-800",
      },
      cell: ({ row }) => {
        const c = row.original;
        return <OverflowTooltip as="p" text={c.author} className="truncate" />;
      },
    },
    {
      id: "email",
      header: "E-posta",
      maxSize: 192,
      meta: {
        headerClassName: "hidden md:table-cell font-semibold text-slate-600",
        cellClassName: "hidden md:table-cell text-sm text-slate-500",
      },
      cell: ({ row }) => {
        const c = row.original;
        return c.email ? (
          <OverflowTooltip as="p" text={c.email} className="truncate" />
        ) : (
          <span className="text-slate-300">—</span>
        );
      },
    },
    {
      id: "content",
      header: "İçerik",
      maxSize: 256,
      meta: {
        headerClassName: "font-semibold text-slate-600",
      },
      cell: ({ row }) => {
        const c = row.original;
        return (
          <OverflowTooltip
            as="p"
            text={c.content}
            className="truncate text-sm text-slate-600"
          />
        );
      },
    },
    {
      id: "status",
      header: "Durum",
      meta: {
        headerClassName: "font-semibold text-slate-600",
      },
      cell: ({ row }) => {
        const c = row.original;
        return <StatusBadge status={c.status} />;
      },
    },
    {
      id: "date",
      header: "Tarih",
      meta: {
        headerClassName: "hidden lg:table-cell font-semibold text-slate-600",
        cellClassName:
          "hidden lg:table-cell whitespace-nowrap text-sm text-slate-500",
      },
      cell: ({ row }) => {
        const c = row.original;
        return <>{formatTurkishDateTime(c.createdAt)}</>;
      },
    },
    {
      id: "actions",
      header: "Action",
      meta: {
        headerClassName: "w-24 text-center font-semibold text-slate-600",
      },
      cell: ({ row }) => {
        const c = row.original;
        const disabled = handlers.processingId === c.id;
        return (
          <div className="flex items-center justify-center gap-1">
            {c.status !== "APPROVED" && (
              <TableAction
                tooltip="Onayla"
                tone="green"
                icon={Check}
                onClick={() => handlers.onApprove(c)}
                disabled={disabled}
              />
            )}
            {c.status !== "REJECTED" && (
              <TableAction
                tooltip="Reddet"
                tone="red"
                icon={X}
                onClick={() => handlers.onReject(c)}
                disabled={disabled}
              />
            )}
            <TableAction
              tooltip="Sil"
              tone="red"
              icon={Trash2}
              onClick={() => handlers.onDelete(c)}
              disabled={disabled}
            />
          </div>
        );
      },
    },
  ];
}
