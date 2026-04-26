"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getPostComments, fetchAdminPostById } from "@/services/post.service";
import { CommentAdminResponse } from "@/types/post";
import { ApiException } from "@/lib/api";
import CommentTable from "@/components/admin/comment-table";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert } from "@/components/action-alert";
import { Undo2 } from "lucide-react";

export default function PostCommentsPage() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);

  const [comments, setComments] = useState<CommentAdminResponse[]>([]);
  const [postTitle, setPostTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const data = await getPostComments(postId);
      setComments(data);
    } catch (err) {
      const msg =
        err instanceof ApiException ? err.message : "Yorumlar yüklenemedi.";
      setErrorMsg(msg);
    }
  }, [postId]);

  useEffect(() => {
    if (isNaN(postId)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function init() {
      try {
        const [post, commentData] = await Promise.all([
          fetchAdminPostById(postId),
          getPostComments(postId),
        ]);
        setPostTitle(post.title);
        setComments(commentData);
      } catch (err) {
        if (err instanceof ApiException && err.error.status === 404) {
          setNotFound(true);
          return;
        }
        const msg =
          err instanceof ApiException ? err.message : "Veriler yüklenemedi.";
        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [postId, router]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-4 w-36 rounded-md" />
        <div>
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-4 w-64 rounded-md mt-2" />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Yazı Bulunamadı</h1>
        <p className="text-sm text-slate-500">
          ID: {postId} olan bir yazı bulunamadı.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-800 transition-colors w-fit"
      >
        <Undo2 className="h-4 w-4" />
        Yazılar listesine dön
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-800">Yorumlar</h1>
        {postTitle && (
          <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">
            {postTitle}
          </p>
        )}
      </div>

      <CommentTable
        comments={comments}
        onRefresh={fetchComments}
        emptyMessage="Bu yazıya ait yorum bulunmuyor."
      />

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
