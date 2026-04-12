import Link from "next/link";
import { About } from "@/types/about";
import Rose from "@/components/icons/rose";
import Star from "@/components/icons/star";
import Butterfly from "@/components/icons/butterfly";
import Wildflower from "@/components/icons/wildflower";
import HtmlContent from "@/components/html-content";

interface AboutPreviewSectionProps {
  about: About | null;
}

export default function AboutPreviewSection({
  about,
}: AboutPreviewSectionProps) {
  if (!about || !about.message) return null;

  return (
    <section className="relative overflow-hidden bg-pink-50">
      <Rose
        className="pointer-events-none absolute -bottom-2 left-6 h-14 w-14 text-rose-300/35"
        aria-hidden="true"
      />
      <Star
        className="pointer-events-none absolute top-10 left-16 h-8 w-8 text-violet-300/30"
        aria-hidden="true"
      />
      <Butterfly
        className="pointer-events-none absolute top-8 right-12 h-12 w-12 text-rose-300/30"
        aria-hidden="true"
      />
      <Wildflower
        className="pointer-events-none absolute bottom-4 right-48 h-32 w-32 text-rose-200/40"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl text-slate-800 sm:text-4xl">Hakkımda</h2>
            <HtmlContent
              html={about.message}
              className="mt-6 line-clamp-4 text-lg leading-relaxed text-slate-500"
            />
            <Link
              href="/hakkimda"
              className="mt-8 inline-block font-semibold text-rose-500 hover:text-rose-700 hover:underline"
            >
              Daha Fazlası →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
