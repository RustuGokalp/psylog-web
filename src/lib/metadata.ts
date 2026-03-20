import type { Metadata } from "next";

export const siteConfig = {
  name: "Psylog",
  tagline: "Klinik Psikolog",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://psylog.com.tr",
  description:
    "Klinik psikolog portföyü ve makale platformu. Psikoloji, terapi ve zihinsel sağlık üzerine profesyonel içerikler.",
  author: "Psylog",
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
  };
}
