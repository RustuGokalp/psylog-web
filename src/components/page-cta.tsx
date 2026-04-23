import Link from "next/link";
import { cn } from "@/lib/utils";

interface SecondaryButton {
  label: string;
  href: string;
}

interface PageCtaProps {
  description?: string;
  className?: string;
  secondaryButton?: SecondaryButton;
}

export default function PageCta({
  description,
  className,
  secondaryButton,
}: PageCtaProps) {
  return (
    <section className={cn("bg-rose-50", className)}>
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:px-8">
        {description && (
          <p className="text-base text-slate-600">{description}</p>
        )}
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-3",
            description && "mt-5",
          )}
        >
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            İletişime Geç →
          </Link>
          {secondaryButton && (
            <Link
              href={secondaryButton.href}
              className="inline-flex items-center justify-center rounded-full border border-rose-300 px-8 py-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100"
            >
              {secondaryButton.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
