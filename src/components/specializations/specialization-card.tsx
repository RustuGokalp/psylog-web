import Image from "next/image";
import Link from "next/link";
import { Specialization } from "@/types/specialization";
import HtmlContent from "@/components/html-content";

interface SpecializationCardProps {
  item: Specialization;
  index: number;
  interactive?: boolean;
}

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

export default function SpecializationCard({
  item,
  index,
  interactive = true,
}: SpecializationCardProps) {
  const isEven = index % 2 === 0;
  const placeholderColor =
    PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

  const detailHref = `/calisma-alanlarim/${item.slug}`;
  const imageHref = interactive ? `/calisma-alanlarim/${item.slug}` : "#";

  const imageBlock = interactive ? (
    <Link
      href={imageHref}
      tabIndex={-1}
      aria-hidden="true"
      className="group relative block h-60 w-full shrink-0 overflow-hidden rounded-2xl shadow-sm md:h-72 md:w-2/5"
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
  ) : (
    <div
      className="group relative block h-60 w-full shrink-0 overflow-hidden rounded-2xl shadow-sm md:h-72 md:w-2/5"
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
    </div>
  );

  const detailLink = interactive ? (
    <Link
      href={detailHref}
      className="relative z-10 mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-800 hover:underline"
    >
      Daha Fazlası →
    </Link>
  ) : (
    <span className="mt-4 inline-flex w-fit cursor-default items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-800 hover:underline">
      Daha Fazlası →
    </span>
  );

  return (
    <article
      className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-12 ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {imageBlock}

      <div className="relative flex flex-1 flex-col">
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
        {detailLink}
        {interactive && (
          <Link
            href={detailHref}
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0"
          />
        )}
      </div>
    </article>
  );
}
