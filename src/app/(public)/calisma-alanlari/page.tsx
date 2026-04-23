import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { getSpecializations } from "@/services/specialization.service";
import HtmlContent from "@/components/html-content";
import Daisy from "@/components/icons/daisy";
import Butterfly from "@/components/icons/butterfly";
import Star from "@/components/icons/star";
import Blob from "@/components/icons/blob";
import Rose from "@/components/icons/rose";
import PageHero from "@/components/page-hero";
import PageCta from "@/components/page-cta";

export const metadata: Metadata = createMetadata({
  title: "Çalışma Alanlarım",
  description:
    "Klinik Psikolog Tuğçe Tekin'in çocuk ve ergen alanındaki uzmanlık ve çalışma alanları hakkında bilgi edinin.",
  path: "/calisma-alanlari",
});

const PLACEHOLDER_COLORS = [
  "bg-violet-100",
  "bg-rose-100",
  "bg-sky-100",
  "bg-purple-100",
  "bg-pink-100",
];

const ACCENT_COLORS = [
  "bg-violet-400",
  "bg-rose-400",
  "bg-sky-400",
  "bg-purple-400",
  "bg-pink-400",
];

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
              {specializations.map((item, index) => {
                const isEven = index % 2 === 0;
                const placeholderColor =
                  PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
                const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

                return (
                  <article
                    key={item.id}
                    className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-12 ${
                      isEven ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Image */}
                    <Link
                      href={`/calisma-alanlari/${item.slug}`}
                      className="group relative block h-60 w-full shrink-0 overflow-hidden rounded-2xl shadow-sm md:h-72 md:w-2/5"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      {item.image !== null ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      ) : (
                        <div
                          className={`h-full w-full ${placeholderColor}`}
                          aria-hidden="true"
                        />
                      )}
                    </Link>

                    {/* Text */}
                    <div className="flex flex-1 flex-col">
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${accentColor} text-xs font-bold text-white`}
                          aria-hidden="true"
                        >
                          {index + 1}
                        </span>
                        <h2 className="text-2xl font-semibold tracking-tight text-violet-900 sm:text-3xl">
                          {item.title}
                        </h2>
                      </div>
                      <HtmlContent
                        html={item.summary}
                        className="text-base leading-relaxed text-slate-600"
                      />
                      <Link
                        href={`/calisma-alanlari/${item.slug}`}
                        className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-800 hover:underline"
                      >
                        Daha Fazlası →
                      </Link>
                    </div>
                  </article>
                );
              })}
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
