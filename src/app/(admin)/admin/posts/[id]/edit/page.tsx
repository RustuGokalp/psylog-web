"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchAdminPostById } from "@/services/post.service";
import { PostDetail } from "@/types/post";
import { ApiException } from "@/lib/api";
import PostForm, { resolvePublishMode } from "@/components/admin/post-form";
import { PostFormValues } from "@/schemas/post.schema";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isNaN(postId)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function fetchPost() {
      try {
        const detail = await fetchAdminPostById(postId);
        setPost(detail);
      } catch (err) {
        if (err instanceof ApiException && err.error.status === 404) {
          setNotFound(true);
          return;
        }
        const msg =
          err instanceof ApiException ? err.message : "Yazı yüklenemedi.";
        toast.error(msg);
        router.push("/admin/posts");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId, router]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 max-w-3xl">
        <div>
          <Skeleton className="h-8 w-40 rounded-md" />
          <Skeleton className="h-4 w-56 rounded-md mt-2" />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Yazı Bulunamadı</h1>
        <p className="text-sm text-slate-500">
          ID: {postId} olan bir yazı bulunamadı.
        </p>
      </div>
    );
  }

  const { publishMode, publishAt } = resolvePublishMode(
    post.published,
    post.publishAt,
  );

  const initialValues: PostFormValues = {
    title: post.title,
    summary: post.summary,
    content: post.content,
    coverImage: post.coverImage ?? "",
    tags: post.tags,
    publishMode,
    publishAt,
    readingTime: post.readingTime !== null ? String(post.readingTime) : "",
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Yazıyı Düzenle</h1>
        <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">
          {post.title}
        </p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <PostForm
          mode="edit"
          initialValues={initialValues}
          postId={postId}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
        />
      </div>
    </div>
  );
}
