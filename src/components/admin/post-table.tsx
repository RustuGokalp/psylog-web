"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
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
import { DataTable } from "@/components/ui/DataTable";
import { createPostColumns } from "@/components/tables/columns/post-columns";
import { TableAction } from "@/components/tables/table-action";

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

  function renderMobileCard(post: AdminPost) {
    const pendingCount =
      post.comments?.filter((c) => c.status === "PENDING").length ?? 0;
    return (
      <div className="flex flex-col gap-2.5 p-4">
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
            <TableAction
              tooltip="Yorumları Gör"
              tone="violet"
              icon={MessagesSquare}
              onClick={() => router.push(`/admin/posts/${post.id}/comments`)}
            />
            <TableAction
              tooltip="Düzenle"
              tone="amber"
              icon={Pencil}
              onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
            />
            <TableAction
              tooltip="Sil"
              tone="red"
              icon={Trash2}
              onClick={() => setDeleteTarget(post)}
            />
          </div>
        </div>
      </div>
    );
  }

  const columns = useMemo(
    () =>
      createPostColumns({
        onViewComments: (id) => router.push(`/admin/posts/${id}/comments`),
        onEdit: (id) => router.push(`/admin/posts/${id}/edit`),
        onDelete: (post) => setDeleteTarget(post),
        onTogglePublish: handleTogglePublish,
        togglingId,
      }),
    [router, togglingId],
  );

  return (
    <>
      <DataTable<AdminPost>
        columns={columns}
        data={posts}
        getRowId={(p) => String(p.id)}
        renderMobileCard={renderMobileCard}
        emptyState={emptyState}
      />

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
