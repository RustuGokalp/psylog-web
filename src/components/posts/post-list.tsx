"use client";

import { useEffect, useRef, useState } from "react";
import { Post } from "@/types/post";
import { fetchPublicPosts } from "@/services/post.service";
import PostCard from "@/components/posts/post-card";

interface PostListProps {
  initialPosts: Post[];
  initialLast: boolean;
}

export default function PostList({ initialPosts, initialLast }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(initialLast);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosts(initialPosts);
    setPage(0);
    setIsLast(initialLast);
  }, [initialPosts, initialLast]);

  useEffect(() => {
    if (isLast) return;

    async function loadMore() {
      setIsLoading(true);
      try {
        const nextPage = page + 1;
        const data = await fetchPublicPosts({ page: nextPage, size: 10 });
        setPosts((prev) => [...prev, ...data.content]);
        setPage(nextPage);
        setIsLast(data.last);
      } catch {
      } finally {
        setIsLoading(false);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [isLast, isLoading, page]);

  if (posts.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}

      {!isLast && <div ref={sentinelRef} className="h-1" aria-hidden="true" />}

      {isLoading && (
        <div
          className="flex justify-center py-8"
          aria-live="polite"
          aria-label="Yükleniyor"
        >
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-rose-300 border-t-rose-500" />
        </div>
      )}

      {isLast && posts.length > 0 && (
        <p className="py-8 text-center text-sm text-slate-400">
          Tüm yazılar yüklendi.
        </p>
      )}
    </div>
  );
}
