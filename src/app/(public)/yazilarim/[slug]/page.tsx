import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { safeJsonLd } from "@/lib/format";
import { getPost } from "@/services/post.service";
import { getAbout } from "@/services/about.service";
import { PostDetail } from "@/types/post";
import PostArticle from "@/components/posts/post-article";
import CommentSection from "@/components/posts/comment-section";
import PageCta from "@/components/page-cta";

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

      <PostArticle post={post} about={about} interactive>
        <CommentSection postId={post.id} initialComments={post.comments} />
      </PostArticle>

      <PageCta
        description="Sorularınız için benimle iletişime geçebilirsiniz."
        className="bg-rose-tint"
      />
    </>
  );
}
