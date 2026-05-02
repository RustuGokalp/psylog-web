"use client";

import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ActionAlert, AlertType } from "@/components/action-alert";
import { ApiException } from "@/lib/api";
import {
  deletePost,
  fetchAdminPostById,
  updatePost,
} from "@/services/post.service";
import { AdminPost } from "@/types/post";
import { MessageSquare, MessagesSquare, Pencil, Trash2 } from "lucide-react";
import { formatReadingTime, formatTurkishDate } from "@/lib/format";

interface PostTableProps {
  posts: AdminPost[];
  onDeleteSuccess?: () => void;
}

type FeedbackAlert = {
  type: AlertType;
  title: string;
  description?: string;
} | null;

export default function PostTable({
  posts: initialPosts,
  onDeleteSuccess,
}: PostTableProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<AdminPost[]>(initialPosts);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [draftTarget, setDraftTarget] = useState<AdminPost | null>(null);
  const [toggleTarget, setToggleTarget] = useState<AdminPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedbackAlert, setFeedbackAlert] = useState<FeedbackAlert>(null);

  function handleTogglePublish(post: AdminPost) {
    if (!post.published) {
      setDraftTarget(post);
      return;
    }
    setToggleTarget(post);
  }

  async function handleConfirmToggle() {
    if (!toggleTarget) return;
    setToggleTarget(null);
    setTogglingId(toggleTarget.id);
    try {
      const detail = await fetchAdminPostById(toggleTarget.id);
      const updated = await updatePost(toggleTarget.id, {
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
          p.id === toggleTarget.id ? { ...p, published: updated.published } : p,
        ),
      );
      setFeedbackAlert({
        type: "success",
        title: "Taslağa Alındı",
        description: "Yazı başarıyla taslağa alındı.",
      });
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Durum güncellenirken bir hata oluştu.";
      setFeedbackAlert({ type: "error", title: "Hata", description: msg });
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
      onDeleteSuccess?.();
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Yazı silinirken bir hata oluştu.";
      setDeleteTarget(null);
      setFeedbackAlert({ type: "error", title: "Hata", description: msg });
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

  const emptyState = (
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

  if (posts.length === 0) return emptyState;

  function renderStatusBadge(post: AdminPost) {
    if (post.published)
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 shrink-0">
          Yayında
        </Badge>
      );
    if (post.publishAt)
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 shrink-0">
          Zamanlandı
        </Badge>
      );
    return (
      <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 shrink-0">
        Taslak
      </Badge>
    );
  }

  return (
    <>
      {/* Mobile card list — hidden on sm+ */}
      <div className="sm:hidden flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {posts.map((post) => {
          const pendingCount =
            post.comments?.filter((c) => c.status === "PENDING").length ?? 0;
          return (
            <div key={post.id} className="flex flex-col gap-2.5 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="flex-1 text-sm font-medium leading-snug text-slate-800 line-clamp-2">
                  {post.title}
                </p>
                {renderStatusBadge(post)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {formatTurkishDate(post.createdAt)}
                  {post.readingTime != null &&
                    ` · ${formatReadingTime(post.readingTime)}`}
                </span>
                {pendingCount > 0 && (
                  <Link
                    href={`/admin/posts/${post.id}/comments`}
                    className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 hover:bg-violet-200 transition-colors"
                  >
                    <MessageSquare className="h-3 w-3" />
                    {pendingCount} bekliyor
                  </Link>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Yayınla</span>
                  {togglingId === post.id ? (
                    <Skeleton className="h-5 w-9 rounded-full" />
                  ) : (
                    <Switch
                      checked={post.published}
                      onCheckedChange={() => handleTogglePublish(post)}
                      aria-label={post.published ? "Taslağa al" : "Yayınla"}
                    />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      router.push(`/admin/posts/${post.id}/comments`)
                    }
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-violet-400 transition-colors hover:bg-violet-50 hover:text-violet-600"
                    aria-label="Yorumları Gör"
                  >
                    <MessagesSquare className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-amber-500 transition-colors hover:bg-amber-100 hover:text-amber-800"
                    aria-label="Düzenle"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(post)}
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Sil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop table — hidden on mobile */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="min-w-50 font-semibold text-slate-600">
                Başlık
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                Durum
              </TableHead>
              <TableHead className="hidden md:table-cell font-semibold text-slate-600">
                Etiketler
              </TableHead>
              <TableHead className="hidden lg:table-cell font-semibold text-slate-600">
                Oluşturulma
              </TableHead>
              <TableHead className="hidden lg:table-cell font-semibold text-slate-600">
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
              <TableHead className="w-20 text-center font-semibold text-slate-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} className="hover:bg-slate-50">
                {/* Başlık */}
                <TableCell>
                  <p className="font-medium text-slate-800 line-clamp-1">
                    {post.title}
                  </p>
                </TableCell>

                {/* Durum */}
                <TableCell>
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
                  {post.tags.length === 0 ? (
                    <span className="text-xs text-slate-300">—</span>
                  ) : (
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
                            <TooltipContent
                              side="top"
                              className="flex flex-col gap-0.5"
                            >
                              {post.tags.slice(3).map((tag) => (
                                <span key={tag}>{tag}</span>
                              ))}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  )}
                </TableCell>

                {/* Oluşturulma */}
                <TableCell className="hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap">
                  {formatTurkishDate(post.createdAt)}
                </TableCell>

                {/* Güncelleme */}
                <TableCell className="hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap">
                  {post.updatedAt ? formatTurkishDate(post.updatedAt) : "—"}
                </TableCell>

                {/* Okuma süresi */}
                <TableCell className="hidden xl:table-cell text-center text-sm text-slate-500">
                  {post.readingTime != null
                    ? formatReadingTime(post.readingTime)
                    : "—"}
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
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        router.push(`/admin/posts/${post.id}/comments`)
                      }
                      className="h-8 w-8 cursor-pointer text-violet-400 hover:text-violet-600 hover:bg-violet-50"
                      aria-label="Yorumları Gör"
                    >
                      <MessagesSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        router.push(`/admin/posts/${post.id}/edit`)
                      }
                      className="h-8 w-8 cursor-pointer text-amber-400 hover:text-amber-500 hover:bg-amber-50"
                      aria-label="Düzenle"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(post)}
                      className="h-8 w-8 cursor-pointer text-red-400 hover:text-red-600 hover:bg-red-50"
                      aria-label="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Draft edit prompt */}
      <ActionAlert
        open={!!draftTarget}
        type="info"
        title="Taslak Yazı"
        description={
          draftTarget
            ? `"${draftTarget.title}" taslak durumunda. Yayınlamak için önce düzenleme sayfasına gidin.`
            : undefined
        }
        onClose={() => setDraftTarget(null)}
        onConfirm={() => {
          if (!draftTarget) return;
          router.push(`/admin/posts/${draftTarget.id}/edit`);
          setDraftTarget(null);
        }}
        confirmLabel="Düzenle"
      />

      {/* Unpublish confirmation */}
      <ActionAlert
        open={!!toggleTarget}
        type="warning"
        title="Yazıyı Taslağa Al"
        description={
          toggleTarget
            ? `"${toggleTarget.title}" adlı yazı yayından kaldırılacak ve taslağa alınacak. Onaylıyor musunuz?`
            : undefined
        }
        onClose={() => setToggleTarget(null)}
        onConfirm={handleConfirmToggle}
        confirmLabel="Taslağa Al"
      />

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
