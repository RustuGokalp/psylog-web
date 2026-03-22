import Link from "next/link";
import { About } from "@/types/about";
import Daisy from "@/components/icons/daisy";
import Rose from "@/components/icons/rose";
import Star from "@/components/icons/star";

interface AboutPreviewSectionProps {
  about: About | null;
}

export default function AboutPreviewSection({ about }: AboutPreviewSectionProps) {
  if (!about || !about.message) return null;

  const truncated =
    about.message.length > 300
      ? about.message.slice(0, 300) + "..."
      : about.message;

  return (
    <section className="relative overflow-hidden bg-violet-50">
      <Daisy className="pointer-events-none absolute -top-3 -right-3 h-16 w-16 text-violet-300/25" aria-hidden="true" />
      <Rose  className="pointer-events-none absolute -bottom-3 -left-3 h-12 w-12 text-violet-400/20" aria-hidden="true" />
      <Star className="pointer-events-none absolute top-8 left-10 h-8 w-8 text-violet-300/25" aria-hidden="true" />
      <div className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl text-violet-800 sm:text-4xl">
            Hakkımda
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {truncated}
          </p>
          <Link
            href="/hakkimda"
            className="mt-8 inline-block font-semibold text-violet-600 hover:text-violet-800 hover:underline"
          >
            Daha Fazlası →
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
