import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";
import Daisy from "@/components/icons/daisy";
import Star from "@/components/icons/star";
import Rose from "@/components/icons/rose";
import FlowerStem from "@/components/icons/flower-stem";

interface PostsPreviewSectionProps {
  posts: Post[];
}

const PLACEHOLDER_COLORS = ["bg-rose-100", "bg-violet-100", "bg-sky-100"];

function formatTurkishDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PostsPreviewSection({
  posts,
}: PostsPreviewSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-sky-50">
      <Rose
        className="pointer-events-none absolute -top-3 -left-3 h-16 w-16 text-rose-300/30"
        aria-hidden="true"
      />
      <Daisy
        className="pointer-events-none absolute top-8 right-14 h-12 w-12 text-violet-300/30"
        aria-hidden="true"
      />
      <FlowerStem
        className="pointer-events-none absolute bottom-6 right-8 h-24 w-24 text-rose-300/25"
        aria-hidden="true"
      />
      <Star
        className="pointer-events-none absolute bottom-10 left-1/4 h-7 w-7 text-violet-300/30"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl text-slate-800 sm:text-4xl">
              Son Yazılarım
            </h2>
            <p className="mt-4 text-base text-slate-500">
              Çocuk ve ergen psikolojisi üzerine kaleme aldığım son yazılar.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const placeholderColor =
                PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
              const truncatedSummary =
                post.summary.length > 120
                  ? post.summary.slice(0, 120) + "..."
                  : post.summary;

              return (
                <Link
                  key={post.id}
                  href={`/yazilarim/${post.slug}`}
                  className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Card className="h-full overflow-hidden rounded-2xl shadow-sm transition-shadow group-hover:shadow-md">
                    <div className="relative h-44 w-full">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                      ) : (
                        <div
                          className={`h-full w-full ${placeholderColor}`}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <CardHeader className="pt-4">
                      <CardTitle>
                        <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-rose-600">
                          {post.title}
                        </h3>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-3">
                      <p className="text-sm text-muted-foreground">
                        {truncatedSummary}
                      </p>

                      <time
                        dateTime={post.createdAt}
                        className="text-xs text-muted-foreground"
                      >
                        {formatTurkishDate(post.createdAt)}
                      </time>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/yazilarim"
              className="font-semibold text-rose-500 hover:text-rose-700 hover:underline"
            >
              Tüm Yazılarım →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
