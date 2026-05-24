"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageSquare, MessagesSquare, Pencil, Trash2 } from "lucide-react";
import {
  formatTurkishDate,
  formatReadingTime,
  formatTurkishDateTime,
} from "@/lib/format";
import { AdminPost } from "@/types/post";
import { TableAction } from "@/components/tables/table-action";

export interface PostColumnHandlers {
  onViewComments: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (post: AdminPost) => void;
  onTogglePublish: (post: AdminPost) => void;
  togglingId: number | null;
}

export function createPostColumns(
  handlers: PostColumnHandlers,
): ColumnDef<AdminPost>[] {
  return [
    {
      id: "title",
      accessorKey: "title",
      header: "Başlık",
      meta: {
        headerClassName: "min-w-50 font-semibold text-slate-600",
      },
      cell: ({ row }) => {
        const post = row.original;
        return (
          <p className="font-medium text-slate-800 line-clamp-1">
            {post.title}
          </p>
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
        const post = row.original;
        if (post.published) {
          return (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Yayında
            </Badge>
          );
        }
        if (post.publishAt) {
          return (
            <div className="flex flex-col gap-0.5 text-center">
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 w-fit">
                Zamanlandı
              </Badge>
              <span className="text-xs text-slate-400">
                {formatTurkishDateTime(post.publishAt)}
              </span>
            </div>
          );
        }
        return (
          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100">
            Taslak
          </Badge>
        );
      },
    },
    {
      id: "tags",
      header: "Etiketler",
      meta: {
        headerClassName: "hidden md:table-cell font-semibold text-slate-600",
        cellClassName: "hidden md:table-cell",
      },
      cell: ({ row }) => {
        const post = row.original;
        if (post.tags.length === 0) {
          return <span className="text-xs text-slate-300">—</span>;
        }
        return (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <TooltipProvider delay={200}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className="text-xs font-normal text-slate-400 cursor-default"
                    >
                      +{post.tags.length - 3}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="flex flex-col gap-0.5">
                    {post.tags.slice(3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: "Oluşturulma",
      meta: {
        headerClassName: "hidden lg:table-cell font-semibold text-slate-600",
        cellClassName:
          "hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap",
      },
      cell: ({ row }) => {
        const post = row.original;
        return <>{formatTurkishDate(post.createdAt)}</>;
      },
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      header: "Güncelleme",
      meta: {
        headerClassName: "hidden lg:table-cell font-semibold text-slate-600",
        cellClassName:
          "hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap",
      },
      cell: ({ row }) => {
        const post = row.original;
        return <>{post.updatedAt ? formatTurkishDate(post.updatedAt) : "—"}</>;
      },
    },
    {
      id: "readingTime",
      accessorKey: "readingTime",
      header: "Okuma",
      meta: {
        headerClassName:
          "hidden xl:table-cell font-semibold text-slate-600 text-center",
        cellClassName:
          "hidden xl:table-cell text-center text-sm text-slate-500",
      },
      cell: ({ row }) => {
        const post = row.original;
        return (
          <>
            {post.readingTime != null
              ? formatReadingTime(post.readingTime)
              : "—"}
          </>
        );
      },
    },
    {
      id: "comments",
      header: "Yorumlar",
      meta: {
        headerClassName:
          "hidden lg:table-cell font-semibold text-slate-600 text-center",
        cellClassName: "hidden lg:table-cell text-center",
      },
      cell: ({ row }) => {
        const post = row.original;
        const pendingCount =
          post.comments?.filter((c) => c.status === "PENDING").length ?? 0;
        if (pendingCount > 0) {
          return (
            <Link
              href={`/admin/posts/${post.id}/comments`}
              className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700 hover:bg-violet-200 transition-colors"
            >
              <MessageSquare className="h-3 w-3" />
              {pendingCount} bekliyor
            </Link>
          );
        }
        return <span className="text-xs text-slate-300">—</span>;
      },
    },
    {
      id: "publish",
      header: "Yayınla",
      meta: {
        headerClassName: "w-20 text-center font-semibold text-slate-600",
        cellClassName: "text-center",
      },
      cell: ({ row }) => {
        const post = row.original;
        if (handlers.togglingId === post.id) {
          return (
            <div className="flex justify-center">
              <Skeleton className="h-5 w-9 rounded-full" />
            </div>
          );
        }
        return (
          <Switch
            checked={post.published}
            onCheckedChange={() => handlers.onTogglePublish(post)}
            aria-label={post.published ? "Taslağa al" : "Yayınla"}
          />
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      meta: {
        headerClassName: "w-20 text-center font-semibold text-slate-600",
      },
      cell: ({ row }) => {
        const post = row.original;
        return (
          <div className="flex items-center justify-center gap-1">
            <TableAction
              tooltip="Yorumları Gör"
              tone="violet"
              icon={MessagesSquare}
              onClick={() => handlers.onViewComments(post.id)}
            />
            <TableAction
              tooltip="Düzenle"
              tone="amber"
              icon={Pencil}
              onClick={() => handlers.onEdit(post.id)}
            />
            <TableAction
              tooltip="Sil"
              tone="red"
              icon={Trash2}
              onClick={() => handlers.onDelete(post)}
            />
          </div>
        );
      },
    },
  ];
}
