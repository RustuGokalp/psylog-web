import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { getPosts } from "@/services/post.service";
import { Post } from "@/types/post";
import PostList from "@/components/posts/post-list";
import Daisy from "@/components/icons/daisy";
import Rose from "@/components/icons/rose";
import Star from "@/components/icons/star";
import Blob from "@/components/icons/blob";
import Wildflower from "@/components/icons/wildflower";
import FlowerStem from "@/components/icons/flower-stem";

export const metadata: Metadata = createMetadata({
  title: "Yazılarım",
  description:
    "Klinik Psikolog Tuğçe Tekin'in çocuk ve ergen psikolojisi, duygusal gelişim ve zihinsel sağlık üzerine kaleme aldığı yazılar.",
  path: "/yazilarim",
});

function buildJsonLd(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Yazılarım",
    description:
      "Klinik Psikolog Tuğçe Tekin'in çocuk ve ergen psikolojisi, duygusal gelişim ve zihinsel sağlık üzerine kaleme aldığı yazılar.",
    url: `${siteConfig.url}/yazilarim`,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      url: `${siteConfig.url}/yazilarim/${post.slug}`,
      datePublished: post.createdAt,
      ...(post.coverImage && { image: post.coverImage }),
      ...(post.readingTime && {
        timeRequired: `PT${post.readingTime}M`,
      }),
      keywords: post.tags.join(", "),
      author: {
        "@type": "Person",
        name: siteConfig.author,
      },
    })),
  };
}

export default async function YazilarimPage() {
  const initialData = await getPosts({ page: 0, size: 10 });
  const posts = initialData.content;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(posts)) }}
      />

      <section className="relative overflow-hidden bg-rose-50">
        <Blob
          className="pointer-events-none absolute -top-8 -left-8 h-48 w-48 text-rose-200/30"
          aria-hidden="true"
        />
        <Daisy
          className="pointer-events-none absolute top-5 right-20 h-12 w-12 text-rose-300/40"
          aria-hidden="true"
        />
        <Wildflower
          className="pointer-events-none absolute bottom-3 left-1/4 h-14 w-14 text-violet-300/35"
          aria-hidden="true"
        />
        <Star
          className="pointer-events-none absolute top-1/2 right-10 h-7 w-7 -translate-y-1/2 text-rose-400/30"
          aria-hidden="true"
        />
        <Rose
          className="pointer-events-none absolute bottom-5 right-1/3 h-9 w-9 text-rose-300/30"
          aria-hidden="true"
        />

        <div className="relative">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-500">
              Blog
            </p>
            <h1 className="text-4xl font-bold text-rose-900 sm:text-5xl">
              Yazılarım
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-rose-800/70">
              Çocuk ve ergen psikolojisi, duygusal gelişim ve zihinsel sağlık
              üzerine düşüncelerimi paylaştığım yazılar.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <PostList initialPosts={posts} initialLast={initialData.last} />
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <FlowerStem className="h-16 w-16 text-rose-200" aria-hidden="true" />
      <p className="text-base text-slate-500">
        Henüz yazı yayınlanmamış. Lütfen daha sonra tekrar ziyaret edin.
      </p>
    </div>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-violet-50">
      <Daisy
        className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-violet-200/40"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <p className="text-base text-slate-600">
          Sorularınız veya randevu talepleriniz için benimle iletişime
          geçebilirsiniz.
        </p>
        <Link
          href="/iletisim"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-rose-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
        >
          İletişime Geç →
        </Link>
      </div>
    </section>
  );
}
