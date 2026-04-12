import Image from "next/image";
import Link from "next/link";
import { Specialization } from "@/types/specialization";
import HtmlContent from "@/components/html-content";
import Daisy from "@/components/icons/daisy";
import Butterfly from "@/components/icons/butterfly";
import Star from "@/components/icons/star";
import Rose from "@/components/icons/rose";

interface Props {
  item: Specialization;
}

export default function SpecializationDetail({ item }: Props) {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-purple-100">
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
        <div className="relative">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Link
              href="/calisma-alanlari"
              className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline"
            >
              ← Çalışma Alanlarım
            </Link>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-500">
              Uzmanlık Alanı
            </p>
            <h1 className="text-4xl font-bold text-purple-900 sm:text-5xl">
              {item.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-violet-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          {item.image && (
            <div className="relative mb-10 h-72 w-full overflow-hidden rounded-2xl shadow-sm sm:h-96">
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

          <div className="mt-14 flex flex-col items-center gap-4 border-t border-violet-200 pt-10 text-center">
            <p className="text-base text-slate-600">
              Bu alanda destek almak ister misiniz?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-600"
              >
                Randevu Al
              </Link>
              <Link
                href="/calisma-alanlari"
                className="inline-flex items-center justify-center rounded-full border border-violet-300 px-7 py-3 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-100"
              >
                Diğer Alanlar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
