"use client";

import { useEffect, useState, useCallback } from "react";
import { getAdminComments } from "@/services/comment.service";
import { CommentAdminResponse } from "@/types/post";
import { ApiException } from "@/lib/api";
import CommentTable from "@/components/admin/comment-table";
import AdminPagination from "@/components/admin/admin-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert } from "@/components/action-alert";

const PAGE_SIZE = 10;

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentAdminResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchComments = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const data = await getAdminComments(p, PAGE_SIZE);
      setComments(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      const msg =
        err instanceof ApiException ? err.message : "Yorumlar yüklenemedi.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments(page);
  }, [fetchComments, page]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Bekleyen Yorumlar</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {loading
            ? "Yorumlar yükleniyor..."
            : `${totalElements} bekleyen yorum`}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <CommentTable comments={comments} />
      )}

      {!loading && (
        <AdminPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
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
