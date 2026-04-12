"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getAdminPosts } from "@/services/post.service";
import { AdminPost } from "@/types/post";
import { ApiException } from "@/lib/api";
import PostTable from "@/components/admin/post-table";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert } from "@/components/action-alert";
import { Plus } from "lucide-react";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminPosts();
      setPosts(data);
    } catch (err) {
      const msg =
        err instanceof ApiException ? err.message : "Yazılar yüklenemedi.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Yazılar</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Tüm blog yazılarını yönetin
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Yeni Yazı</span>
          <span className="sm:hidden">Yeni</span>
        </Link>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <PostTable posts={posts} />
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
