import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getAbout } from "@/services/about.service";
import AboutContent from "@/components/about/about-content";

export const metadata: Metadata = createMetadata({
  title: "Hakkımda",
  description:
    "Klinik Psikolog Tuğçe Tekin hakkında bilgi edinin. Çocuk ve ergen psikolojisi alanında uzman, sıcak ve destekleyici bir terapi ortamı sunmaktadır.",
  path: "/hakkimda",
});

export default async function HakkimdaPage() {
  const about = await getAbout();

  return (
    <main>
      <AboutContent about={about} />
    </main>
  );
}
