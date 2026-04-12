"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert, AlertType } from "@/components/action-alert";
import {
  deletePost,
  fetchAdminPostById,
  updatePost,
} from "@/services/post.service";
import { AdminPost } from "@/types/post";
import { MessageSquare, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface PostTableProps {
  posts: AdminPost[];
}

type FeedbackAlert = {
  type: AlertType;
  title: string;
  description?: string;
} | null;

export default function PostTable({ posts: initialPosts }: PostTableProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<AdminPost[]>(initialPosts);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedbackAlert, setFeedbackAlert] = useState<FeedbackAlert>(null);

  async function handleTogglePublish(post: AdminPost) {
    if (!post.published) {
      setFeedbackAlert({
        type: "info",
        title: "Taslak Düzenleme",
        description: "Taslağı yayınlamak için düzenleyip kaydedin.",
      });
      router.push(`/admin/posts/${post.id}/edit`);
      return;
    }

    setTogglingId(post.id);
    try {
      const detail = await fetchAdminPostById(post.id);

      const updated = await updatePost(post.id, {
        title: detail.title,
        summary: detail.summary,
        content: detail.content,
        coverImage: detail.coverImage,
        tags: detail.tags,
        published: false,
        readingTime: detail.readingTime,
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, published: updated.published } : p,
        ),
      );
      setFeedbackAlert({
        type: "success",
        title: "Taslağa Alındı",
        description: "Yazı başarıyla taslağa alındı.",
      });
    } catch {
      setFeedbackAlert({
        type: "error",
        title: "Hata",
        description: "Durum güncellenirken bir hata oluştu.",
      });
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const title = deleteTarget.title;
    try {
      await deletePost(deleteTarget.id);
      setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
      setFeedbackAlert({
        type: "success",
        title: "Yazı Silindi",
        description: `"${title}" başarıyla silindi.`,
      });
    } catch {
      setDeleteTarget(null);
      setFeedbackAlert({
        type: "error",
        title: "Hata",
        description: "Yazı silinirken bir hata oluştu.",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <p className="text-sm text-slate-500">Henüz yazı yok.</p>
        <Link
          href="/admin/posts/new"
          className="mt-4 inline-flex items-center rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
        >
          Yeni Yazı Oluştur
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="min-w-50 font-semibold text-slate-600">
                Başlık
              </TableHead>
              <TableHead className="hidden sm:table-cell font-semibold text-slate-600">
                Durum
              </TableHead>
              <TableHead className="hidden md:table-cell font-semibold text-slate-600">
                Etiketler
              </TableHead>
              <TableHead className="hidden lg:table-cell font-semibold text-slate-600">
                Oluşturulma
              </TableHead>
              <TableHead className="hidden xl:table-cell font-semibold text-slate-600">
                Güncelleme
              </TableHead>
              <TableHead className="hidden xl:table-cell font-semibold text-slate-600 text-center">
                Okuma
              </TableHead>
              <TableHead className="hidden lg:table-cell font-semibold text-slate-600 text-center">
                Yorumlar
              </TableHead>
              <TableHead className="w-20 text-center font-semibold text-slate-600">
                Yayınla
              </TableHead>
              <TableHead className="w-12.5" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} className="hover:bg-slate-50">
                {/* Başlık */}
                <TableCell>
                  <div>
                    <p className="font-medium text-slate-800 line-clamp-1">
                      {post.title}
                    </p>
                    <p className="text-xs text-slate-400 sm:hidden mt-0.5">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </TableCell>

                {/* Durum */}
                <TableCell className="hidden sm:table-cell">
                  {post.published ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Yayında
                    </Badge>
                  ) : post.publishAt ? (
                    <div className="flex flex-col gap-0.5">
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 w-fit">
                        Zamanlandı
                      </Badge>
                      <span className="text-xs text-slate-400">
                        {formatDate(post.publishAt)}
                      </span>
                    </div>
                  ) : (
                    <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100">
                      Taslak
                    </Badge>
                  )}
                </TableCell>

                {/* Etiketler */}
                <TableCell className="hidden md:table-cell">
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
                      <Badge
                        variant="outline"
                        className="text-xs font-normal text-slate-400"
                      >
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>

                {/* Oluşturulma */}
                <TableCell className="hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap">
                  {formatDate(post.createdAt)}
                </TableCell>

                {/* Güncelleme */}
                <TableCell className="hidden xl:table-cell text-sm text-slate-500 whitespace-nowrap">
                  {post.updatedAt ? formatDate(post.updatedAt) : "—"}
                </TableCell>

                {/* Okuma süresi */}
                <TableCell className="hidden xl:table-cell text-center text-sm text-slate-500">
                  {post.readingTime != null ? `${post.readingTime} dk` : "—"}
                </TableCell>

                {/* Yorumlar */}
                <TableCell className="hidden lg:table-cell text-center">
                  {(() => {
                    const pendingCount =
                      post.comments?.filter((c) => c.status === "PENDING")
                        .length ?? 0;
                    return pendingCount > 0 ? (
                      <Link
                        href={`/admin/posts/${post.id}/comments`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700 hover:bg-violet-200 transition-colors"
                      >
                        <MessageSquare className="h-3 w-3" />
                        {pendingCount} bekliyor
                      </Link>
                    ) : (
                      <span className="text-xs text-slate-300">—</span>
                    );
                  })()}
                </TableCell>

                {/* Yayınla toggle */}
                <TableCell className="text-center">
                  {togglingId === post.id ? (
                    <div className="flex justify-center">
                      <Skeleton className="h-5 w-9 rounded-full" />
                    </div>
                  ) : (
                    <Switch
                      checked={post.published}
                      onCheckedChange={() => handleTogglePublish(post)}
                      aria-label={post.published ? "Taslağa al" : "Yayınla"}
                    />
                  )}
                </TableCell>

                {/* Aksiyonlar */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      aria-label="İşlemler"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus:outline-none"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/admin/posts/${post.id}/edit`)
                        }
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => setDeleteTarget(post)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete confirmation */}
      <ActionAlert
        open={!!deleteTarget}
        type="warning"
        title="Yazıyı Sil"
        description={
          deleteTarget
            ? `"${deleteTarget.title}" adlı yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
            : undefined
        }
        onClose={() => !isDeleting && setDeleteTarget(null)}
        onConfirm={handleDelete}
        confirmLabel="Sil"
        loading={isDeleting}
      />

      {/* Feedback */}
      <ActionAlert
        open={!!feedbackAlert}
        type={feedbackAlert?.type ?? "info"}
        title={feedbackAlert?.title ?? ""}
        description={feedbackAlert?.description}
        onClose={() => setFeedbackAlert(null)}
      />
    </>
  );
}
