import type { Metadata } from "next";

export const siteConfig = {
  name: "Tuğçe Tekin",
  tagline: "Klinik Psikolog",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tugcetekin.com",
  description:
    "Klinik Psikolog Tuğçe Tekin'in resmi web sitesi. Psikoloji, terapi ve zihinsel sağlık üzerine profesyonel yazılar ve danışmanlık bilgisi.",
  author: "Tuğçe Tekin",
  locale: "tr_TR",
} as const;


interface CreateMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
}

export function createMetadata({
  title,
  description,
  path = "",
  openGraph,
}: CreateMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const resolvedDescription = description ?? siteConfig.description;

  return {
    title,
    description: resolvedDescription,
    openGraph: {
      title,
      description: resolvedDescription,
      url,
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
    },
  };
}
