import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  index?: number;
  commentsCount?: number;
}

const PLACEHOLDER_COLORS = [
  "bg-rose-100",
  "bg-violet-100",
  "bg-sky-100",
  "bg-purple-100",
  "bg-pink-100",
];

function formatTurkishDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PostCard({
  post,
  index = 0,
  commentsCount,
}: PostCardProps) {
  const placeholderColor =
    PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  const summary =
    post.summary.length > 160
      ? post.summary.slice(0, 160) + "..."
      : post.summary;

  return (
    <Link
      href={`/yazilarim/${post.slug}`}
      className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <article className="flex flex-row overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5">
        <div className="relative aspect-square w-1/3 shrink-0 overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 400px"
            />
          ) : (
            <div
              className={`h-full w-full ${placeholderColor}`}
              aria-hidden="true"
            />
          )}

          {post.readingTime !== null && (
            <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm">
              <svg
                className="h-3 w-3 text-rose-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readingTime} dk
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-600 hover:bg-violet-100"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h2 className="text-sm font-semibold leading-snug text-slate-800 transition-colors group-hover:text-rose-600 sm:text-base">
            {post.title}
          </h2>

          <p className="flex-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
            {summary}
          </p>

          <div className="flex items-center justify-between pt-1">
            {commentsCount !== undefined && commentsCount > 0 ? (
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {commentsCount}
              </span>
            ) : (
              <span />
            )}

            <time dateTime={post.createdAt} className="text-xs text-slate-400">
              {formatTurkishDate(post.createdAt)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}
