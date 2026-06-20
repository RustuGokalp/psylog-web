"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ActionAlert, AlertType } from "@/components/action-alert";
import { ApiException } from "@/lib/api";
import {
  approveComment,
  rejectComment,
  deleteComment,
} from "@/services/comment.service";
import { CommentAdminResponse } from "@/types/post";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, MessageSquare, Trash2, X } from "lucide-react";
import { formatTurkishDateTime } from "@/lib/format";
import { DataTable } from "@/components/ui/DataTable";
import {
  createCommentColumns,
  CommentStatusBadge,
} from "@/components/tables/columns/comment-columns";

interface CommentTableProps {
  comments: CommentAdminResponse[];
  onRefresh?: () => void;
  emptyMessage?: string;
  fillHeight?: boolean;
}

type FeedbackAlert = {
  type: AlertType;
  title: string;
  description?: string;
} | null;

function CommentDetail({ comment }: { comment: CommentAdminResponse }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
      <dt className="text-slate-400 font-medium whitespace-nowrap">Yazar</dt>
      <dd className="text-slate-700">{comment.author}</dd>

      {comment.email && (
        <>
          <dt className="text-slate-400 font-medium whitespace-nowrap">
            E-posta
          </dt>
          <dd className="text-slate-700 break-all">{comment.email}</dd>
        </>
      )}

      <dt className="text-slate-400 font-medium whitespace-nowrap">Yazı</dt>
      <dd className="text-slate-700">{comment.postTitle}</dd>

      <dt className="text-slate-400 font-medium whitespace-nowrap">Yorum</dt>
      <dd className="text-slate-700 line-clamp-3">{comment.content}</dd>
    </dl>
  );
}

export default function CommentTable({
  comments: initialComments,
  onRefresh,
  emptyMessage = "Bekleyen yorum bulunmuyor.",
  fillHeight,
}: CommentTableProps) {
  const [comments, setComments] =
    useState<CommentAdminResponse[]>(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const [approveTarget, setApproveTarget] =
    useState<CommentAdminResponse | null>(null);
  const [rejectTarget, setRejectTarget] = useState<CommentAdminResponse | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<CommentAdminResponse | null>(
    null,
  );
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [feedbackAlert, setFeedbackAlert] = useState<FeedbackAlert>(null);

  async function handleApprove() {
    if (!approveTarget) return;
    const target = approveTarget;
    setApproveTarget(null);
    setProcessingId(target.id);
    try {
      await approveComment(target.id);
      if (onRefresh) {
        onRefresh();
      } else {
        setComments((prev) => prev.filter((c) => c.id !== target.id));
      }
      setFeedbackAlert({
        type: "success",
        title: "Yorum Onaylandı",
        description: `"${target.author}" yorumu başarıyla onaylandı.`,
      });
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Yorum onaylanırken bir hata oluştu.";
      setFeedbackAlert({ type: "error", title: "Hata", description: msg });
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject() {
    if (!rejectTarget) return;
    const target = rejectTarget;
    setRejectTarget(null);
    setProcessingId(target.id);
    try {
      await rejectComment(target.id);
      if (onRefresh) {
        onRefresh();
      } else {
        setComments((prev) => prev.filter((c) => c.id !== target.id));
      }
      setFeedbackAlert({
        type: "success",
        title: "Yorum Reddedildi",
        description: `"${target.author}" yorumu reddedildi.`,
      });
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Yorum reddedilirken bir hata oluştu.";
      setFeedbackAlert({ type: "error", title: "Hata", description: msg });
    } finally {
      setProcessingId(null);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    setProcessingId(target.id);
    try {
      await deleteComment(target.id);
      setFeedbackAlert({
        type: "success",
        title: "Yorum Silindi",
        description: `"${target.author}" yorumu kalıcı olarak silindi.`,
      });
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Yorum silinirken bir hata oluştu.";
      setFeedbackAlert({ type: "error", title: "Hata", description: msg });
    } finally {
      setProcessingId(null);
    }
  }

  const emptyState = (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
      <MessageSquare className="mx-auto h-8 w-8 text-slate-300" />
      <p className="mt-3 text-sm text-slate-500">{emptyMessage}</p>
    </div>
  );

  function renderMobileCard(comment: CommentAdminResponse) {
    return (
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-slate-800">{comment.author}</p>
          <span className="shrink-0 text-xs text-slate-400">
            {formatTurkishDateTime(comment.createdAt)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/yazilarim/${comment.postSlug}`}
            target="_blank"
            className="text-xs font-medium text-violet-600 hover:underline line-clamp-1"
          >
            {comment.postTitle}
          </Link>
          <CommentStatusBadge status={comment.status} />
        </div>

        <p className="line-clamp-2 text-xs text-slate-500">{comment.content}</p>

        <div className="flex items-center gap-2 border-t border-slate-100 pt-2.5">
          <TooltipProvider delay={200}>
            {comment.status !== "APPROVED" && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={processingId === comment.id}
                      onClick={() => setApproveTarget(comment)}
                      className="h-8 flex-1 cursor-pointer gap-1.5 text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Onayla
                    </Button>
                  }
                />
                <TooltipContent>Onayla</TooltipContent>
              </Tooltip>
            )}
            {comment.status !== "REJECTED" && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={processingId === comment.id}
                      onClick={() => setRejectTarget(comment)}
                      className="h-8 flex-1 cursor-pointer gap-1.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <X className="h-3.5 w-3.5" />
                      Reddet
                    </Button>
                  }
                />
                <TooltipContent>Reddet</TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={processingId === comment.id}
                    onClick={() => setDeleteTarget(comment)}
                    className="h-8 w-8 cursor-pointer p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                    aria-label="Sil"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                }
              />
              <TooltipContent>Sil</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  }

  const columns = useMemo(
    () =>
      createCommentColumns({
        onApprove: (c) => setApproveTarget(c),
        onReject: (c) => setRejectTarget(c),
        onDelete: (c) => setDeleteTarget(c),
        processingId,
      }),
    [processingId],
  );

  return (
    <>
      <DataTable<CommentAdminResponse>
        columns={columns}
        data={comments}
        getRowId={(c) => String(c.id)}
        renderMobileCard={renderMobileCard}
        emptyState={emptyState}
        fillHeight={fillHeight}
      />

      {/* Approve confirmation */}
      <ActionAlert
        open={!!approveTarget}
        type="warning"
        title="Yorum Onaylanacak"
        description="Bu yorum herkese açık hale gelecek. Onaylıyor musunuz?"
        content={
          approveTarget ? <CommentDetail comment={approveTarget} /> : null
        }
        onClose={() => setApproveTarget(null)}
        onConfirm={handleApprove}
        confirmLabel="Onayla"
        confirmClassName="bg-green-600 hover:bg-green-700 text-white"
        loading={processingId === approveTarget?.id}
      />

      {/* Reject confirmation */}
      <ActionAlert
        open={!!rejectTarget}
        type="warning"
        title="Yorum Reddedilecek"
        description="Bu yorum reddedilecek ve yayınlanmayacak. Onaylıyor musunuz?"
        content={rejectTarget ? <CommentDetail comment={rejectTarget} /> : null}
        onClose={() => setRejectTarget(null)}
        onConfirm={handleReject}
        confirmLabel="Reddet"
        loading={processingId === rejectTarget?.id}
      />

      {/* Delete confirmation */}
      <ActionAlert
        open={!!deleteTarget}
        type="warning"
        title="Yorum Silinecek"
        description="Bu yorum kalıcı olarak silinecek ve geri alınamaz. Devam etmek istiyor musunuz?"
        content={deleteTarget ? <CommentDetail comment={deleteTarget} /> : null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        confirmLabel="Sil"
        confirmClassName="bg-red-600 hover:bg-red-700 text-white"
        loading={processingId === deleteTarget?.id}
      />

      {/* Feedback */}
      <ActionAlert
        open={!!feedbackAlert}
        type={feedbackAlert?.type ?? "info"}
        title={feedbackAlert?.title ?? ""}
        description={feedbackAlert?.description}
        onClose={() => {
          const type = feedbackAlert?.type;
          setFeedbackAlert(null);
          if (type === "success" && onRefresh) onRefresh();
        }}
      />
    </>
  );
}
