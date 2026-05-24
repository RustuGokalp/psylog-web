import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getSpecializations } from "@/services/specialization.service";
import Daisy from "@/components/icons/daisy";
import Butterfly from "@/components/icons/butterfly";
import Star from "@/components/icons/star";
import Blob from "@/components/icons/blob";
import Rose from "@/components/icons/rose";
import PageHero from "@/components/page-hero";
import PageCta from "@/components/page-cta";
import SpecializationCard from "@/components/specializations/specialization-card";

export const metadata: Metadata = createMetadata({
  title: "Çalışma Alanlarım",
  description:
    "Klinik Psikolog Tuğçe Tekin'in çocuk ve ergen alanındaki uzmanlık ve çalışma alanları hakkında bilgi edinin.",
  path: "/calisma-alanlarim",
});

export default async function CalismaAlanlariPage() {
  const specializations = await getSpecializations();

  return (
    <main>
      <PageHero
        className="bg-purple-100"
        label="Uzmanlık Alanları"
        labelClassName="text-purple-500"
        lineClassName="bg-purple-400"
        title="Çalışma Alanlarım"
        titleClassName="text-purple-900"
        description="Danışanlarımla yürüttüğüm terapötik çalışmalarda odaklandığım başlıca uzmanlık alanlarını aşağıda bulabilirsiniz."
        descriptionClassName="text-purple-800/70"
        icons={
          <>
            <Blob
              className="pointer-events-none absolute -top-10 -left-10 h-52 w-52 text-purple-200/30"
              aria-hidden="true"
            />
            <Daisy
              className="pointer-events-none absolute top-6 right-16 h-14 w-14 text-purple-300/40"
              aria-hidden="true"
            />
            <Butterfly
              className="pointer-events-none absolute bottom-4 left-1/4 h-12 w-12 text-violet-300/35"
              aria-hidden="true"
            />
            <Star
              className="pointer-events-none absolute top-1/2 right-8 h-8 w-8 -translate-y-1/2 text-purple-400/30"
              aria-hidden="true"
            />
            <Rose
              className="pointer-events-none absolute bottom-4 right-1/3 h-10 w-10 text-rose-300/30"
              aria-hidden="true"
            />
          </>
        }
      />

      {/* List */}
      <section className="bg-violet-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          {specializations.length === 0 ? (
            <p className="text-center text-base text-muted-foreground">
              Henüz çalışma alanı eklenmemiş. Lütfen daha sonra tekrar ziyaret
              edin.
            </p>
          ) : (
            <div className="flex flex-col gap-16">
              {specializations.map((item, index) => (
                <SpecializationCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <PageCta
        description="Danışanlarımla terapötik bir süreç başlatmak için benimle iletişime geçebilirsiniz."
        className="bg-violet-50"
      />
    </main>
  );
}
