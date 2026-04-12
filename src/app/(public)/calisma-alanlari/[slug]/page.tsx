import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import {
  getSpecializations,
  getSpecializationBySlug,
} from "@/services/specialization.service";
import SpecializationDetail from "@/components/specializations/specialization-detail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const specializations = await getSpecializations();
  return specializations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getSpecializationBySlug(slug);

  if (!item) {
    return createMetadata({
      title: "Sayfa Bulunamadı",
      description: "",
      path: `/calisma-alanlari/${slug}`,
    });
  }

  return createMetadata({
    title: item.title,
    description: item.summary.replace(/<[^>]*>/g, "").slice(0, 160),
    path: `/calisma-alanlari/${item.slug}`,
  });
}

export default async function SpecializationDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getSpecializationBySlug(slug);

  if (!item) notFound();

  return <SpecializationDetail item={item} />;
}
