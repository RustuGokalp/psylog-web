"use client";

import { useEffect } from "react";
import { Caveat } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RotateCcw, Home } from "lucide-react";
import PaperPlane from "@/components/icons/paper-plane";
import WaveDivider from "@/components/icons/wave-divider";

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  function handleHome() {
    router.push("/");
    router.refresh();
  }

  return (
    <div
      className={`${caveat.variable} nf-scene relative min-h-screen flex flex-col`}
    >
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 nf-dot-grid" />
        <WaveDivider
          color="var(--nf-rose-mid)"
          secondaryColor="var(--nf-lavender-soft)"
          className="absolute bottom-0 left-0 w-full"
        />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-24">
        <div className="mx-auto max-w-xl flex flex-col items-center">
          <div
            className="relative w-72 sm:w-80 h-32 mx-auto"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 320 128"
              fill="none"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 100 C 60 20, 120 10, 180 50 C 220 80, 260 30, 295 18"
                stroke="var(--nf-lavender)"
                strokeWidth="1.5"
                strokeDasharray="6 5"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
              />
            </svg>
            <div className="animate-drift absolute right-4 top-3 text-(--nf-rose)">
              <PaperPlane className="w-12 h-9 sm:w-14 sm:h-10" />
            </div>
          </div>

          <p className="nf-script-lavender text-xl sm:text-2xl -mt-2 mb-1 leading-none">
            küçük bir iniş…
          </p>

          <p className="nf-404 text-6xl sm:text-7xl leading-none mt-2">tüh!</p>

          <div className="flex items-center gap-3 mt-5">
            <span className="flex-1 h-px bg-(--nf-border)" />
            <span className="nf-eyebrow text-xs uppercase tracking-widest">
              BEKLENMEDİK BİR HATA
            </span>
            <span className="flex-1 h-px bg-(--nf-border)" />
          </div>

          <h1 className="nf-title font-display text-3xl sm:text-4xl leading-snug mt-4">
            Erken bir iniş yaptık.
          </h1>

          <p className="nf-text mt-4 max-w-md mx-auto text-base leading-relaxed">
            Sayfa beklenmedik şekilde sonlandı — kağıttan bir uçak gibi yeniden
            katlayıp havalandırabiliriz.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button
              onClick={reset}
              className="nf-btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Tekrar Uçur
            </button>

            <Link
              href="/"
              onClick={handleHome}
              className="nf-btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Ana Sayfa
            </Link>
          </div>

          <div className="w-full mt-10 border-t border-dashed nf-sep" />

          <details className="mt-4 w-full text-left group relative">
            <summary className="nf-eyebrow text-xs uppercase tracking-widest cursor-pointer list-none flex items-center gap-2 select-none">
              <span
                className="inline-block transition-transform group-open:rotate-90"
                aria-hidden="true"
              >
                ›
              </span>
              HATA DETAYI
            </summary>

            <div className="absolute left-0 right-0 top-full mt-3 font-mono text-xs nf-text space-y-1 pl-4">
              {error.digest && (
                <p>
                  <span className="nf-eyebrow">digest:</span> {error.digest}
                </p>
              )}
              {process.env.NODE_ENV === "development" && error.message && (
                <p className="wrap-break-word">
                  <span className="nf-eyebrow">message:</span> {error.message}
                </p>
              )}
              {!error.digest && process.env.NODE_ENV !== "development" && (
                <p className="nf-eyebrow italic">Detay mevcut değil.</p>
              )}
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}
