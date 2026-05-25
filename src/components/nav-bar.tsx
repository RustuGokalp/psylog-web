"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NavSquiggle from "@/components/icons/nav-squiggle";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const SHRINK_AT = 60;
    const GROW_AT = 20;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > SHRINK_AT) return true;
        if (prev && y < GROW_AT) return false;
        return prev;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-cream-tint/85 shadow-sm backdrop-blur-md"
          : "bg-(--color-cream-tint)",
      )}
    >
      <nav
        aria-label="Ana navigasyon"
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between px-4 transition-[padding] duration-300",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <Link href="/" className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-rose-900 transition-[font-size] duration-300",
              scrolled ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl",
            )}
          >
            {SITE_NAME}
          </span>
          <span className="mt-1 whitespace-nowrap text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-rose-400">
            Çocuk &amp; Ergen · Klinik Psikoloğu
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                {isActive ? (
                  <Link
                    href={link.href}
                    aria-current="page"
                    className="relative whitespace-nowrap font-display italic text-rose-900 text-base"
                  >
                    {link.label}
                    <NavSquiggle className="absolute -bottom-2 left-0 h-2 w-full text-rose-500" />
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-rose-700"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA + Mobile menu button */}
        <div className="flex items-center gap-3">
          <Link
            href="/iletisim"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Randevu Al
          </Link>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <ul className="border-t border-rose-100 bg-(--color-cream-tint) lg:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block px-4 py-3 text-sm transition-colors hover:bg-rose-50",
                    isActive
                      ? "font-display italic text-rose-900"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          {/* Mobile CTA */}
          <li className="px-4 py-3">
            <Link
              href="/iletisim"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Randevu Al
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
