import Link from "next/link";
import { About } from "@/types/about";

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
    <section className="bg-violet-50">
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
    </section>
  );
}
