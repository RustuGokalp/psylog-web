import { cn } from "@/lib/utils";

interface PageHeroProps {
  label: string;
  labelClassName?: string;
  lineClassName?: string;
  title: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  className?: string;
  icons?: React.ReactNode;
  children?: React.ReactNode;
}

export default function PageHero({
  label,
  labelClassName,
  lineClassName,
  title,
  titleClassName,
  description,
  descriptionClassName,
  className,
  icons,
  children,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {icons}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          {children}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className={cn("h-px w-7", lineClassName)}
              aria-hidden="true"
            />
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-widest",
                labelClassName,
              )}
            >
              {label}
            </span>
            <span
              className={cn("h-px w-7", lineClassName)}
              aria-hidden="true"
            />
          </div>
          <h1 className={cn("text-4xl font-bold sm:text-5xl", titleClassName)}>
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mx-auto mt-4 max-w-xl text-base",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
