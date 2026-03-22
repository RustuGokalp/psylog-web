import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getAbout } from "@/services/about.service";
import { getSpecializations } from "@/services/specialization.service";
import { getPosts } from "@/services/post.service";
import HeroSection from "@/components/home/hero-section";
import AboutPreviewSection from "@/components/home/about-preview-section";
import SpecializationsPreviewSection from "@/components/home/specializations-preview-section";
import PostsPreviewSection from "@/components/home/posts-preview-section";
import ContactCtaSection from "@/components/home/contact-cta-section";

export const metadata: Metadata = createMetadata({
  title: "Çocuk ve Ergen Klinik Psikoloğu",
  description:
    "Çocuk ve ergen klinik psikoloğu Tuğçe Tekin'in resmi web sitesi. Uzmanlık alanları, yazılar ve randevu bilgileri.",
  path: "/",
});

export default async function HomePage() {
  const [about, specializations, posts] = await Promise.all([
    getAbout(),
    getSpecializations(),
    getPosts(),
  ]);

  return (
    <>
      <HeroSection about={about} />
      <AboutPreviewSection about={about} />
      <SpecializationsPreviewSection
        specializations={specializations.slice(0, 3)}
      />
      <PostsPreviewSection posts={posts.slice(0, 3)} />
      <ContactCtaSection />
    </>
  );
}
