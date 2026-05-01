import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";
import { formatTurkishDate, formatReadingTime } from "@/lib/format";

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

export default function PostCard({
  post,
  index = 0,
  commentsCount,
}: PostCardProps) {
  const placeholderColor =
    PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  const summary =
    post.summary.length > 300
      ? post.summary.slice(0, 300) + "..."
      : post.summary;

  const mobileSummary =
    post.summary.length > 120
      ? post.summary.slice(0, 120) + "..."
      : post.summary;

  return (
    <Link
      href={`/yazilarim/${post.slug}`}
      className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <article className="flex h-auto flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg sm:h-60 sm:flex-row">
        <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:w-1/3 sm:self-stretch">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
            />
          ) : (
            <div
              className={`h-full w-full ${placeholderColor}`}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h2 className="text-sm font-semibold leading-snug text-slate-800 transition-colors group-hover:text-rose-600 sm:text-base">
            {post.title}
          </h2>

          <p className="flex-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
            <span className="sm:hidden">{mobileSummary}</span>
            <span className="hidden sm:inline">{summary}</span>
          </p>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <time dateTime={post.createdAt}>
                {formatTurkishDate(post.createdAt)}
              </time>
              {post.readingTime !== null && (
                <>
                  <span aria-hidden="true">|</span>
                  <span>{formatReadingTime(post.readingTime!)} okuma</span>
                </>
              )}
            </div>

            {commentsCount !== undefined && commentsCount > 0 && (
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
            )}
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-400 hover:bg-purple-100"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
