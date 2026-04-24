"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ActionAlert, AlertType } from "@/components/action-alert";
import { ApiException } from "@/lib/api";
import { approveComment, rejectComment } from "@/services/comment.service";
import { CommentAdminResponse } from "@/types/post";
import { Check, MessageSquare, X } from "lucide-react";

interface CommentTableProps {
  comments: CommentAdminResponse[];
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
      <dd className="text-slate-700 line-clamp-1">{comment.postTitle}</dd>

      <dt className="text-slate-400 font-medium whitespace-nowrap">Yorum</dt>
      <dd className="text-slate-700 line-clamp-3">{comment.content}</dd>
    </dl>
  );
}

export default function CommentTable({
  comments: initialComments,
}: CommentTableProps) {
  const [comments, setComments] =
    useState<CommentAdminResponse[]>(initialComments);
  const [approveTarget, setApproveTarget] =
    useState<CommentAdminResponse | null>(null);
  const [rejectTarget, setRejectTarget] = useState<CommentAdminResponse | null>(
    null,
  );
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [feedbackAlert, setFeedbackAlert] = useState<FeedbackAlert>(null);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleApprove() {
    if (!approveTarget) return;
    const target = approveTarget;
    setApproveTarget(null);
    setProcessingId(target.id);
    try {
      await approveComment(target.id);
      setComments((prev) => prev.filter((c) => c.id !== target.id));
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
      setComments((prev) => prev.filter((c) => c.id !== target.id));
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

  if (comments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <MessageSquare className="mx-auto h-8 w-8 text-slate-300" />
        <p className="mt-3 text-sm text-slate-500">
          Bekleyen yorum bulunmuyor.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile card list */}
      <div className="sm:hidden flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-2 p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-slate-800">
                {comment.author}
              </p>
              <span className="shrink-0 text-xs text-slate-400">
                {formatDate(comment.createdAt)}
              </span>
            </div>

            <Link
              href={`/yazilarim/${comment.postSlug}`}
              target="_blank"
              className="text-xs font-medium text-violet-600 hover:underline line-clamp-1"
            >
              {comment.postTitle}
            </Link>

            <p className="line-clamp-2 text-xs text-slate-500">
              {comment.content}
            </p>

            <div className="flex items-center gap-2 border-t border-slate-100 pt-2.5">
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
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="font-semibold text-slate-600">
                Yazı
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                Yazar
              </TableHead>
              <TableHead className="hidden md:table-cell font-semibold text-slate-600">
                E-posta
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                İçerik
              </TableHead>
              <TableHead className="hidden lg:table-cell font-semibold text-slate-600">
                Tarih
              </TableHead>
              <TableHead className="w-24 text-center font-semibold text-slate-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id} className="hover:bg-slate-50">
                <TableCell className="max-w-40">
                  <Link
                    href={`/yazilarim/${comment.postSlug}`}
                    target="_blank"
                    className="line-clamp-1 text-sm font-medium text-violet-600 hover:underline"
                  >
                    {comment.postTitle}
                  </Link>
                </TableCell>

                <TableCell className="whitespace-nowrap text-sm font-medium text-slate-800">
                  {comment.author}
                </TableCell>

                <TableCell className="hidden md:table-cell text-sm text-slate-500">
                  {comment.email ?? (
                    <span className="text-slate-300">—</span>
                  )}
                </TableCell>

                <TableCell className="max-w-64">
                  <p className="line-clamp-2 text-sm text-slate-600">
                    {comment.content}
                  </p>
                </TableCell>

                <TableCell className="hidden lg:table-cell whitespace-nowrap text-sm text-slate-500">
                  {formatDate(comment.createdAt)}
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={processingId === comment.id}
                      onClick={() => setApproveTarget(comment)}
                      className="h-8 w-8 cursor-pointer text-green-500 hover:text-green-700 hover:bg-green-50"
                      aria-label="Onayla"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={processingId === comment.id}
                      onClick={() => setRejectTarget(comment)}
                      className="h-8 w-8 cursor-pointer text-red-400 hover:text-red-600 hover:bg-red-50"
                      aria-label="Reddet"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
