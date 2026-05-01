import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { formatTurkishDate, formatReadingTime, safeJsonLd } from "@/lib/format";
import { cn } from "@/lib/utils";
import { getPost } from "@/services/post.service";
import { getAbout } from "@/services/about.service";
import { PostDetail } from "@/types/post";
import PostContent from "@/components/posts/post-content";
import { Badge } from "@/components/ui/badge";
import CommentSection from "@/components/posts/comment-section";
import Blob from "@/components/icons/blob";
import Rose from "@/components/icons/rose";
import Star from "@/components/icons/star";
import Daisy from "@/components/icons/daisy";
import Butterfly from "@/components/icons/butterfly";
import PageCta from "@/components/page-cta";
import Wildflower from "@/components/icons/wildflower";
import ShareButton from "@/components/posts/share-button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { robots: { index: false } };
  }

  return createMetadata({
    title: post.title,
    description: post.summary,
    path: `/yazilarim/${post.slug}`,
    openGraph: {
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  });
}

function buildJsonLd(post: PostDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    url: `${siteConfig.url}/yazilarim/${post.slug}`,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
    },
    ...(post.coverImage && { image: post.coverImage }),
    ...(post.readingTime && { timeRequired: `PT${post.readingTime}M` }),
    keywords: post.tags.join(", "),
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const [post, about] = await Promise.all([getPost(slug), getAbout()]);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(buildJsonLd(post)) }}
      />

      <section className="relative overflow-hidden bg-[#fdf4f5]">
        <Blob
          className="pointer-events-none absolute -right-16 -top-12 h-72 w-72 text-rose-200/40"
          aria-hidden="true"
        />
        <Star
          className="pointer-events-none absolute right-1/4 top-8 h-6 w-6 text-rose-300/40"
          aria-hidden="true"
        />
        <Rose
          className="pointer-events-none absolute bottom-8 left-6 h-8 w-8 text-violet-300/35"
          aria-hidden="true"
        />
        <Daisy
          className="pointer-events-none absolute left-1/3 top-6 h-8 w-8 text-rose-300/30"
          aria-hidden="true"
        />
        <Butterfly
          className="pointer-events-none absolute left-8 top-10 h-10 w-10 text-violet-300/35"
          aria-hidden="true"
        />
        <Wildflower
          className="pointer-events-none absolute bottom-6 right-36 h-14 w-14 text-rose-200/35"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/yazilarim"
            className="mb-6 inline-flex items-center gap-1 text-sm text-rose-500 transition-colors hover:text-rose-600"
          >
            <span aria-hidden="true">←</span> Tüm yazılar
          </Link>

          {post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
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

          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-500">
            {post.summary}
          </p>

          <div className="mt-6 pb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-rose-500">
                {about?.profileImage ? (
                  <Image
                    src={about.profileImage}
                    alt={siteConfig.author}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                    TT
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-slate-800">
                  {siteConfig.author}
                </span>
                <span className="text-xs text-slate-400">Klinik Psikolog</span>
              </div>
              <span className="text-slate-300" aria-hidden="true">
                |
              </span>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <time dateTime={post.createdAt}>
                  {formatTurkishDate(post.createdAt)}
                </time>
                {post.readingTime !== null && (
                  <>
                    <span className="text-slate-300" aria-hidden="true">
                      |
                    </span>
                    <span>{formatReadingTime(post.readingTime)} okuma</span>
                  </>
                )}
              </div>
            </div>
            <ShareButton
              url={`${siteConfig.url}/yazilarim/${post.slug}`}
              title={post.title}
              summary={post.summary}
            />
          </div>
        </div>
      </section>

      {post.coverImage && (
        <div className="relative -mt-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 768px"
              priority
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          "mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8",
          post.coverImage ? "pt-10" : "pt-12",
        )}
      >
        <PostContent content={post.content} />

        <div
          className="my-6 text-center text-base tracking-widest text-slate-300"
          aria-hidden="true"
        >
          ● ● ●
        </div>

        <div className="flex gap-4 rounded-2xl bg-violet-50 p-6">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-rose-500">
            {about?.profileImage ? (
              <Image
                src={about.profileImage}
                alt={siteConfig.author}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-base font-bold text-white">
                TT
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-slate-800">
              {siteConfig.author}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-rose-500">
              Klinik Psikolog · Çocuk ve Ergen Uzmanı
            </span>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Çocuk ve ergen ruh sağlığı alanında uzman psikolog. Psikodinamik
              ve bilişsel davranışçı yaklaşımları bütünleştirerek çocuklar,
              ergenler ve aileleriyle çalışmaktadır.
            </p>
          </div>
        </div>

        <CommentSection postId={post.id} initialComments={post.comments} />
      </div>

      <PageCta
        description="Sorularınız için benimle iletişime geçebilirsiniz."
        className="bg-[#fdf4f5]"
      />
    </>
  );
}
