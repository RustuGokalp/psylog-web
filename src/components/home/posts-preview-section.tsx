import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";
import Blob from "@/components/icons/blob";
import Daisy from "@/components/icons/daisy";
import Butterfly from "@/components/icons/butterfly";
import Star from "@/components/icons/star";

interface PostsPreviewSectionProps {
  posts: Post[];
}

const GRADIENT_PLACEHOLDERS = [
  "from-violet-200 to-purple-100",
  "from-pink-200 to-rose-100",
  "from-blue-200 to-sky-100",
];

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
    <section className="relative overflow-hidden bg-blue-50">
      <Blob      className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 text-blue-200/20" aria-hidden="true" />
      <Daisy     className="pointer-events-none absolute top-6 right-10 h-14 w-14 text-blue-300/25" aria-hidden="true" />
      <Butterfly className="pointer-events-none absolute bottom-6 right-1/4 h-12 w-12 text-blue-400/20" aria-hidden="true" />
      <Star      className="pointer-events-none absolute bottom-8 left-8 h-8 w-8 text-blue-300/20" aria-hidden="true" />
      <div className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl text-blue-800 sm:text-4xl">Son Yazılarım</h2>
          <p className="mt-4 text-base text-muted-foreground">
            Çocuk ve ergen psikolojisi üzerine kaleme aldığım son yazılar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const gradient =
              GRADIENT_PLACEHOLDERS[index % GRADIENT_PLACEHOLDERS.length];
            const truncatedSummary =
              post.summary.length > 120
                ? post.summary.slice(0, 120) + "..."
                : post.summary;

            return (
              <Link
                key={post.id}
                href={`/yazilarim/${post.slug}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
              >
                <Card className="h-full overflow-hidden rounded-2xl shadow-sm transition-shadow group-hover:shadow-md">
                  {/* Cover image or gradient placeholder */}
                  <div className="relative h-44 w-full">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        className={`h-full w-full bg-linear-to-br ${gradient}`}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <CardHeader className="pt-4">
                    <CardTitle>
                      <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-blue-700">
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
            className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Tüm Yazılarım →
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
