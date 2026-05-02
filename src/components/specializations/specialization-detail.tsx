import Image from "next/image";
import Link from "next/link";
import { Specialization } from "@/types/specialization";
import HtmlContent from "@/components/html-content";
import Daisy from "@/components/icons/daisy";
import Butterfly from "@/components/icons/butterfly";
import Star from "@/components/icons/star";
import Rose from "@/components/icons/rose";
import PageHero from "@/components/page-hero";
import PageCta from "@/components/page-cta";

interface Props {
  item: Specialization;
}

export default function SpecializationDetail({ item }: Props) {
  return (
    <main>
      <PageHero
        className="bg-purple-100"
        label="Uzmanlık Alanı"
        labelClassName="text-purple-500"
        lineClassName="bg-purple-400"
        title={item.title}
        titleClassName="text-purple-900"
        description={item.summary}
        descriptionClassName="text-purple-700/70"
        icons={
          <>
            <Daisy
              className="pointer-events-none absolute top-6 right-16 h-14 w-14 text-purple-300/40"
              aria-hidden="true"
            />
            <Butterfly
              className="pointer-events-none absolute bottom-4 left-12 h-12 w-12 text-violet-300/35"
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
      >
        <Link
          href="/calisma-alanlari"
          className="mb-6 flex w-full items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline"
        >
          ← Çalışma Alanlarım
        </Link>
      </PageHero>

      {/* Content */}
      <section className="bg-violet-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          {item.image && (
            <div className="relative mb-10 mx-auto h-72 w-full max-w-2xl overflow-hidden rounded-2xl shadow-sm sm:h-96">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          <HtmlContent
            html={item.content}
            className="prose prose-slate prose-lg max-w-none
              prose-headings:text-violet-900
              prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-800
              prose-li:text-slate-600
              prose-p:text-slate-600 prose-p:leading-relaxed"
          />
        </div>
      </section>

      <PageCta
        description="Bu alanda destek almak ister misiniz?"
        className="bg-violet-50"
        secondaryButton={{ label: "Diğer Alanlar", href: "/calisma-alanlari" }}
      />
    </main>
  );
}
