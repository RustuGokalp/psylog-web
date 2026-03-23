import Link from "next/link";
import { About } from "@/types/about";
import Rose from "@/components/icons/rose";
import Star from "@/components/icons/star";
import Wildflower from "@/components/icons/wildflower";

interface AboutPreviewSectionProps {
  about: About | null;
}

export default function AboutPreviewSection({
  about,
}: AboutPreviewSectionProps) {
  if (!about || !about.message) return null;

  const truncated =
    about.message.length > 300
      ? about.message.slice(0, 300) + "..."
      : about.message;

  return (
    <section className="relative overflow-hidden bg-violet-50">
      <Rose
        className="pointer-events-none absolute -bottom-3 -left-3 h-12 w-12 text-violet-400/20"
        aria-hidden="true"
      />
      <Star
        className="pointer-events-none absolute top-8 left-10 h-8 w-8 text-violet-300/25"
        aria-hidden="true"
      />
      <Wildflower
        className="pointer-events-none absolute bottom-6 right-60 h-36 w-36 "
        aria-hidden="true"
      />
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl text-violet-800 sm:text-4xl">Hakkımda</h2>
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
