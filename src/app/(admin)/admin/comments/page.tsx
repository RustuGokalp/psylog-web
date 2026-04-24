"use client";

import { useEffect, useState, useCallback } from "react";
import { getAdminComments } from "@/services/comment.service";
import { CommentAdminResponse } from "@/types/post";
import { ApiException } from "@/lib/api";
import CommentTable from "@/components/admin/comment-table";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert } from "@/components/action-alert";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentAdminResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminComments();
      setComments(data);
    } catch (err) {
      const msg =
        err instanceof ApiException ? err.message : "Yorumlar yüklenemedi.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Bekleyen Yorumlar</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {loading
            ? "Yorumlar yükleniyor..."
            : `${comments.length} bekleyen yorum`}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <CommentTable comments={comments} />
      )}

      <ActionAlert
        open={!!errorMsg}
        type="error"
        title="Yükleme Hatası"
        description={errorMsg ?? undefined}
        onClose={() => setErrorMsg(null)}
      />
    </div>
  );
}
